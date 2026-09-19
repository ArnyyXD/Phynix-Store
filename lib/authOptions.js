import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-google-client-id.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-google-client-secret",
    }),

    // Phone sign-in for India numbers. The OTP itself is generated and
    // stored by app/api/otp/send/route.js; this provider just checks it.
    CredentialsProvider({
      id: "phone-otp",
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;

        const record = await prisma.otpCode.findFirst({
          where: {
            phone: credentials.phone,
            code: credentials.otp,
            consumed: false,
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: "desc" },
        });

        if (!record) return null;

        await prisma.otpCode.update({
          where: { id: record.id },
          data: { consumed: true },
        });

        let user = await prisma.user.findUnique({
          where: { phone: credentials.phone },
        });

        if (!user) {
          user = await prisma.user.create({
            data: { phone: credentials.phone },
          });
        }

        return user;
      },
    }),
  ],

  // Credentials provider requires JWT sessions — database sessions only
  // work with OAuth/email providers in NextAuth v4.
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
