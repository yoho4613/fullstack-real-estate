import { Button, Container, Group, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    suburb: "",
    city: "",
    country: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
      livingRooms: 0,
    },
    userEmail: user?.email,
  });

  const nextStep = () => {
    setActive((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="Location"
            description="Address"
            // allowStepSelect={shouldAllowSelectStep(0)}
          >
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Images"
            description="Upload"
            // allowStepSelect={shouldAllowSelectStep(1)}
          >
            <UploadImage
              nextStep={nextStep}
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Get full access"
            // allowStepSelect={shouldAllowSelectStep(2)}
          >
            <BasicDetails
              nextStep={nextStep}
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Completed></Stepper.Completed>
        </Stepper>

        {/* <Group position="center" mt="xl">
          <Button
            variant="default"
            onClick={() => handleStepChange(active - 1)}
          >
            Back
          </Button>
          <Button onClick={() => handleStepChange(active + 1)}>
            Next step
          </Button>
        </Group> */}
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
