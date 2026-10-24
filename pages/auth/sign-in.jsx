import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginUser } from "../../config/redux/actions/userAction";

// assets
import background from "../../public/assets/imgAuth/background.jpg";
import gradient from "../../public/assets/imgAuth/gradient.png";
import logo from "../../public/assets/imgAuth/logo.png";

const SignIn = () => {
  const router = useRouter();
  const isRole = router.query.as === "worker" ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: isRole,
    },
  });

  const onSubmit = async (data) => {
    await loginUser(data);
    router.replace("/");
  };

  return (
    <main className="m-0 bg-light">
      <div className="row vh-100 m-0">
        <section className="col-6 position-relative overflow-hidden d-none d-md-block m-0 p-0">
          <Image
            src={background}
            alt="image"
            className="position-absolute w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          <Image
            src={gradient}
            alt="gradient"
            className="position-absolute w-100 h-100"
          />
          <Image
            src={logo}
            alt="logo"
            className="position-absolute"
            style={{ top: 40, left: 40 }}
          />
          <div className="d-flex align-items-center h-100 position-absolute m-5">
            <p className="h1 font-weight-bold text-white">
              Temukan developer berbakat &amp; terbaik di berbagai bidang
              keahlian
            </p>
          </div>
        </section>

        <section className="col-md-6 d-flex flex-column justify-content-center m-0 p-3 p-sm-5">
          <div className="py-4">
            <p className="h3 font-weight-bold">Halo, Pewpeople</p>
            <p className="h6 text-black-50">
              Silakan masuk untuk mengakses akun Anda dan menikmati layanan
              terbaik dari kami. Pastikan informasi yang Anda masukkan benar
              untuk pengalaman yang lebih lancar. Jika Anda lupa kata sandi,
              klik “Lupa Kata Sandi” untuk memulihkan akses.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-black-50">
            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Masukkan alamat email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <small className="text-danger">Alamat email harus diisi</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Kata sandi</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Masukkan kata sandi"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <small className="text-danger">Kata sandi harus diisi</small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link href={`?as=${router.query.as}`} className="text-dark">
                Lupa kata sandi?
              </Link>
            </div>
            <button
              className="btn btn-warning w-100 text-white mt-3"
              type="submit"
            >
              Masuk
            </button>
          </form>
          <p className="text-center my-3">
            Anda belum punya akun?{" "}
            <span>
              <Link
                href={`/auth/sign-up?as=${router.query.as}`}
                className="text-warning"
              >
                Daftar disini
              </Link>
            </span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
