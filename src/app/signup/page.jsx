import Image from "next/image";
import signupImage from "../../../public/signup_image.png";
import SignUpForm from "@/components/SignUpForm/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="md:flex md:flex-2 hidden  min-h-screen w-full bg-white  justify-center items-center">
        <Image
          alt="signup image"
          src={signupImage}
          width={400}
          className="h-[400px]"
        />
      </div>
      <div className="flex  min-h-screen w-full justify-center items-center bg-white">
        <div className="mx-4 flex flex-col justify-evenly h-full w-[480px] md:w-full lg:w-[480px]">
          <div className="flex gap-2 flex-col">
            <h2 className="text-5xl w-max mx-auto text-custom-black font-bold ">
              Sign up
            </h2>
            <p className="w-max text-custom-gray mx-auto">
              Enter your details to get started
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
