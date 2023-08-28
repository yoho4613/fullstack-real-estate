import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import { toast } from "react-toastify";
import { createProperty } from "../../utils/api";
import { useMutation } from "react-query";
import useProperties from "../../hooks/useProperties";

const Facilities = ({
  prevStep,
  setActiveStep,
  setPropertyDetails,
  propertyDetails,
  setOpened,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: 0,
      bathrooms: 0,
      parkings: 0,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { user } = useAuth0();
  const { bedrooms, bathrooms, parkings } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, bathrooms, parkings },
      }));
      mutate();
    }
  };
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createProperty(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
          userEmail: user?.email,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right " }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        suburb: "",
        city: "",
        // country: "",
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
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="Number of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          withAsterisk
          label="Number of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <NumberInput
          withAsterisk
          label="Number of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading} color="green">
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
