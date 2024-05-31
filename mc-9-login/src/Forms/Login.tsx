// npm i @hookform/resolvers is the installation of zodresolver

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().toLowerCase().email({ message: "Please enter a valid email address" }),
  password: z.string().trim().min(10, { message: "Password must contain at least 10 characters" })
})

type FormData = z.infer<typeof schema>

// interface FormData {
//     name:string,
//     age: number
// }

// 

const Login = () => {
    const {register,handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)})
    console.log(errors);
    
    
    const onHelpSubmit = (data:FieldValues) => {
        console.log(data);
    }
    
      return (
        <>
        
              <form onSubmit={handleSubmit(onHelpSubmit)} >
        <div className="mb-3 myContainer">
          <h1 className="text-center">Login</h1>

            <label htmlFor="" className="form-label">Email</label>
            <input {...register("email")} type="email" id="email" placeholder="Enter your email" className="form-control"/>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
            {/* && can be used instead of ?, its the same, just take off the null */}
            
            <label htmlFor="" className="form-label">Enter Password</label>
            <input {...register("password")} type="password" id="password" placeholder="Enter your password" className="form-control"/>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <button className=" mt-3 btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
        </>
      )

}


export default Login