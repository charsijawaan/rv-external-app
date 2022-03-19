import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const ForgotPassword = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    // resolver: yupResolver(loginSchema),
  });

  const ForgotPasswordHandler = async (data) => {
    if (res.status === 200) {
      toast.success(res.data.message);
      mutateCamper(res.data.camper);
      localStorage.setItem("accessToken", res.data.accessToken);
    } else if (res.status === 401) {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="max-w-md py-6 ml-auto mr-auto">
      <div className="flex justify-center">
        <div className="p-2 rounded-3xl bg-airbnb-red">
          <svg
            className="w-[24px] h-[24px] fill-white"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
          </svg>
        </div>
      </div>
      <div className="flex justify-center py-2 text-2xl font-bold">
        Forgot Password
      </div>
      <form onSubmit={handleSubmit(ForgotPasswordHandler)}>
        {/* Email */}
        <div className="py-2">
          <label className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <Input
              type="text"
              placeholder="Email"
              inputClasses={
                formState.errors.email ? "border-red-500" : "border-black"
              }
              register={register("email")}
            />
          </div>
        </div>

        {/* Continue */}
        <div className="py-2">
          <Button type="submit" buttonClasses="w-full">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
