import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, nextStep, setPropertyDetails }) => {
  const { getAll, getNZ } = useCountries();

  const form = useForm({
    initialValues: {
      city: propertyDetails?.city,
      address: propertyDetails?.address,
      suburb: propertyDetails?.suburb,
      // country: propertyDetails?.country,
    },
    validate: {
      city: (value) => validateString(value),
      address: (value) => validateString(value),
      suburb: (value) => validateString(value),
      // country: (value) => validateString(value),
    },
  });
  const { city, address, suburb, country } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        city,
        address,
        suburb,
        // country,
      }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          gap: "3rem",
          marginTop: "3rem",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        {/* Left */}
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="Suburb"
            {...form.getInputProps("suburb", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />
          {/* <Select
            w={"100%"}
            withAsterisk
            label="country"
            clearable
            searchable
            data={getAll()}
            defaultValue={{ label: "New Zealand", value: "NZ" }}
            {...form.getInputProps("country", { type: "input" })}
          /> */}
        </div>

        {/* Right */}
        <div style={{ flex: 1 }}>
          <Map address={address} suburb={suburb} city={city} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
