import Image from "next/image";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@utils/uploadthing";
import DeleteButton from "@components/delete-button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "recipeImage";
}

export default function FileUpload({
  onChange,
  value,
  endpoint,
}: FileUploadProps) {
  const fileType = value?.split(".").pop();
  if (
    fileType === "jpg" ||
    fileType === "png" ||
    fileType === "jpeg" ||
    fileType === "webp"
  ) {
    return (
      <div className="mb-4">
        <span className="font-bold text-gray-900">Uploaded Image</span>
        <div className="group relative w-[200px]">
          <Image
            src={value}
            alt="upload"
            className="rounded-sm"
            height={200}
            width={200}
          />
          <DeleteButton
            onClick={() => onChange("")}
            className="absolute opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(err) => {
          console.log(err);
        }}
      />
    </div>
  );
}
