import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { login } from "../redux/slice/auth";
import { mockUser } from "../utils/mockData";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    dispatch(login(mockUser));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-cream">
      <div className="mb-6 flex flex-col items-center">
        <Image src="/mikan-logo.svg" alt="Mikan Logo" width={80} height={80} />
        <h1 className="text-2xl font-bold mt-3">Mikan.uz</h1>
        <p className="text-gray-500">Master Japanese Language Proficiency</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-orange-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-6">Log In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary-dark transition-colors"
          >
            Log In
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
