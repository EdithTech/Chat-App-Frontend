import { Button, Input } from "@heroui/react";
import React from "react";
import { Link } from "react-router";

const Signup = () => {
    // const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="w-[300px] bg-gray-700 p-5 rounded-md shadow-lg">
        <form className="flex gap-5 flex-col">
          <div>
            <p className="font-semibold text-3xl text-center">Sign Up</p>
          </div>

          <div className="flex flex-col gap-2">
            <Input type="text" label="Name" />
            <Input type="text" label="Username" />
            <Input type="password" label="Password" />
            <Input type="password" label="Confirm Password" />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <Button className="w-full" type="submit" color="primary">
              Sign Up
            </Button>
            <div className="flex gap-2">
              <p>Already have an account?</p>
              <p className="text-blue-600" >
                <Link to={'/login'}>
                Log In
                </Link>
                </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
