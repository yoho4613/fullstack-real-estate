import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";

const UploadImage = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [imageUrl, setImageUrl] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpvcaxkpb",
        uploadPreset: "twyj1cqs",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageUrl }));
    nextStep();
  };

  const handlePrev = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageUrl }));
    prevStep();
  };

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageUrl ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageUrl} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={handlePrev} type="submit">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageUrl} type="submit">
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
