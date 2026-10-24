import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { registerUser } from "../../config/redux/actions/userAction";

// assets
import background from "../../public/assets/imgAuth/background.jpg";
import gradient from "../../public/assets/imgAuth/gradient.png";
import logo from "../../public/assets/imgAuth/logo.png";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: true,
    },
  });

  const onSubmit = async (data) => {
    await registerUser(data);
    router.replace("/");
  };

  return (
    <main className="bg-light">
      <div className="row vh-100 m-0">
        <section className="col-6 position-relative overflow-hidden d-none d-md-block p-0">
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
              Bergabunglah bersama kami dan nikmati berbagai fitur eksklusif
              yang telah kami sediakan. Lengkapi formulir pendaftaran dengan
              informasi yang benar untuk memastikan pengalaman terbaik dalam
              menggunakan layanan kami.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-black-50">
            <div className="form-group">
              <label htmlFor="inputName">Nama</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Masukkan nama panjang"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <small className="text-danger">Nama harus diisi</small>
              )}
            </div>
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
            {router.query.as === "recruiter" && (
              <>
                <div className="form-group">
                  <label htmlFor="inputCompanyName">Perusahaan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCompanyName"
                    placeholder="Masukkan nama perusahaan"
                    {...register("company_name", { required: true })}
                  />
                  {errors.company_name && (
                    <small className="text-danger">
                      Nama perusahaan harus diisi
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="inputPosition">Jabatan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPosition"
                    placeholder="Posisi di perusahaan anda"
                    {...register("position", { required: true })}
                  />
                  {errors.position && (
                    <small className="text-danger">Jabatan harus diisi</small>
                  )}
                </div>
              </>
            )}
            <div className="form-group">
              <label htmlFor="inputPhoneNumber">No. handphone</label>
              <input
                type="number"
                className="form-control"
                id="inputPhoneNumber"
                placeholder="Masukkan nomor handphone"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <small className="text-danger">
                  Nomor handphone harus diisi
                </small>
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
            <div className="form-group">
              <label htmlFor="inputConfirmPassword">
                Konfirmasi kata sandi
              </label>
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                placeholder="Masukkan konfirmasi kata sandi"
                {...register("confirm_password", { required: true })}
              />
              {errors.confirm_password && (
                <small className="text-danger">
                  Konfirmasi kata sandi harus diisi
                </small>
              )}
            </div>
            <button
              className="btn btn-warning w-100 text-white mt-3"
              type="submit"
            >
              Daftar
            </button>
          </form>
          <p className="text-center my-3">
            Anda sudah punya akun?{" "}
            <span>
              <Link
                href={`/auth/sign-in?as=${router.query.as}`}
                className="text-warning"
              >
                Masuk disini
              </Link>
            </span>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUp;
