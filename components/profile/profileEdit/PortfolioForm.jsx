import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

const emptyPortfolio = {
  app_name: "",
  type: "",
  link: "",
};

const urlPattern = {
  value: /^https?:\/\/.+/i,
  message: "Masukkan URL yang valid, diawali http:// atau https://",
};

const PortfolioForm = ({
  initialValues = emptyPortfolio,
  onSubmit,
  onCancel,
  submitLabel,
  submitClassName = "btn btn-warning rounded-pill w-100",
}) => {
  const formId = useId();
  const [objectUrl, setObjectUrl] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...emptyPortfolio, ...initialValues, photo: undefined },
  });
  const selectedPhoto = watch("photo");
  const selectedFile = selectedPhoto?.[0];
  const previewPhoto = objectUrl || initialValues.photo || "";

  useEffect(() => {
    if (!selectedFile) {
      setObjectUrl("");
      return undefined;
    }

    const url = URL.createObjectURL(selectedFile);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const submitForm = handleSubmit(async (values) => {
    const succeeded = await onSubmit({ ...values, photo: selectedFile });
    if (!succeeded) return;

    if (onCancel) {
      onCancel();
    } else {
    reset({ ...emptyPortfolio, ...initialValues, photo: undefined });
    }
  });

  return (
    <form onSubmit={submitForm} className="text-black-50">
      <div className="form-group">
        <label htmlFor={`${formId}-name`}>
          Application Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id={`${formId}-name`}
          placeholder="Enter application name"
          maxLength={100}
          {...register("app_name", { required: true, maxLength: 100 })}
        />
        {errors.app_name && (
          <small className="text-danger">
            {errors.app_name.type === "maxLength"
              ? "Application name must be less than 100 characters"
              : "Application name is required"}
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={`${formId}-link`}>
          Link Repository <span className="text-danger">*</span>
        </label>
        <input
          type="url"
          className="form-control"
          id={`${formId}-link`}
          placeholder="https://github.com/username/project"
          {...register("link", { required: true, pattern: urlPattern })}
        />
        {errors.link && (
          <small className="text-danger">
            {errors.link.type === "pattern"
              ? urlPattern.message
              : "Link repository is required"}
          </small>
        )}
      </div>

      <div className="form-group">
        <label>
          Type <span className="text-danger">*</span>
        </label>
        <div className="d-flex">
          {["Aplikasi mobile", "Aplikasi website"].map((type, index) => (
            <div className="form-check mx-2" key={type}>
              <input
                className="form-check-input"
                type="radio"
                id={`${formId}-type-${index}`}
                value={type}
                {...register("type", { required: true })}
              />
              <label
                className="form-check-label"
                htmlFor={`${formId}-type-${index}`}
              >
                {type}
              </label>
            </div>
          ))}
        </div>
        {errors.type && (
          <small className="text-danger">Type is required</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={`${formId}-photo`}>
          Portfolio Image <span className="text-danger">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id={`${formId}-photo`}
          {...register("photo", {
            validate: (files) => {
              const file = files?.[0];
              if (!file && !initialValues.photo) {
                return "Please select a portfolio image";
              }
              if (file && !file.type.startsWith("image/")) {
                return "File must be an image";
              }
              if (file && file.size > 5 * 1024 * 1024) {
                return "Image size must be less than 5 MB";
              }
              return true;
            },
          })}
        />
        {errors.photo && (
          <small className="text-danger">{errors.photo.message}</small>
        )}
        {previewPhoto && (
          <Image
            src={previewPhoto}
            alt="Portfolio preview"
            width={320}
            height={240}
            unoptimized
            className="mt-3 rounded img-fluid"
            style={{ maxHeight: 240, objectFit: "contain" }}
          />
        )}
      </div>

      <hr />
      <div className="d-flex" style={{ gap: 8 }}>
        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill w-100"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          className={submitClassName}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
