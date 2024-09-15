import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { SignInValidations } from "@/lib/validations";
import Loader from "@/components/Loader";
import { useToast } from "@/components/hooks/use-toast";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
  //   useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidations>>({
    resolver: zodResolver(SignInValidations),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidations>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        console.log({ session });
        toast({
          title: "Sign in failed. Please try again.",
        });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      console.log({ isLoggedIn });

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({
          title: "Sign in failed. Please try again.",
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h4-bold md:h3-bold pt-5 sm:pt-2">
          Login to your Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Please enter your details to use InstaBook
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-small-regular  text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
