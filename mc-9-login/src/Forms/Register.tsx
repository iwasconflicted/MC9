import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().trim().toLowerCase().email({ message: "Please enter a valid email address" }),
  password: z.string().trim().min(10, { message: "Password must contain at least 10 characters" }),
  confirmPassword: z.string().trim().min(10, { message: "Password must contain at least 10 characters" })
 })

 .refine((data) => data.password === data.confirmPassword, {
       message: "Passwords must match", 
       path: ["confirmPassword"],
 });


type FormData = z.infer<typeof schema>;


const Register = () => {
  const {register,handleSubmit,formState: { errors },} = useForm<FormData>({ resolver: zodResolver(schema)});
  console.log(errors);

  const onHelpSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onHelpSubmit)}>
        <div className="mb-3 myContainer">
          <h1 className="text-center mb-5" id="register">Register for a New Account!</h1>
            <div className="row">
                <div className="col">
                    <label htmlFor="" className="form-label">First Name</label>
                    <input {...register("firstName")} id="name" type="text" placeholder="Enter your first name" className="form-control"/>
                    {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                </div>
                <div className="col">
                    <label htmlFor=""  className="form-label">Last Name</label>
                    <input {...register("lastName")} id="name" type="text" placeholder="Enter your last name"className="form-control"/>
                    {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                </div>
            </div>

            <label htmlFor="" className="form-label">Email</label>
            <input {...register("email")} id="email"  type="email" placeholder="Enter your email" className="form-control"/>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}

            <label htmlFor="" className="form-label">Password</label>
            <input {...register("password")} id="password" type="password"  placeholder="Enter your password" className="form-control"/>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <label htmlFor="" className="form-label">Confirm Password</label>
            <input {...register("confirmPassword")} id="confirmPassword" type="password"  placeholder="Confirm your password" className="form-control"/>
             {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
             
            <button className="mt-4 btn btn-primary" type="submit">Submit</button>
            
           
        </div>
      </form>
    </>
  );
};

export default Register