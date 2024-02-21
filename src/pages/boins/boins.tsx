import { useEffect, useState } from "react";
import useBoins, { boinQueries } from "../../api/boins/query";
import { BoinApi } from "../../api/boins/api";
import { shawError, shawSuccess } from "../../lib/tosts";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { container, formInput } from "../../components/style/style";
import { IBoins } from "../../api/boins/interfaces";
import { useForm } from "react-hook-form";
import { schema_boin } from "../../components/schema/shcema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material";
import Header from "../../components/Header/Header";
import Body from "../../components/body/body";
import ButtonComponent from "./AddNewBoin";

const Boins = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useBoins();

  const { data: boin, isLoading: isLoadingBoin } =
    boinQueries.useGetBoin(selectedId);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IBoins>({
    resolver: yupResolver(schema_boin),
    defaultValues: {
      name: "",
      details: "",
      price: 0,
    },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && boin) {
      setValue("name", boin.name);
      setValue("details", boin.details);
      setValue("price", boin.price);
      setValue("id", boin.id);
    }
  }, [selectedId, boin]);

  const handleFormSubmit = async (data: IBoins) => {
    try {
      if (selectedId > 0) {
        await BoinApi.updateBoins({ data: data, id: selectedId });
        shawSuccess(t("boin updated successfully"));
      } else {
        await BoinApi.postBoins({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t("boin added sucessfully"));
      }
      refetch();
      setSelectedId(0);
      toggleModal();
      reset();
    } catch (error) {
      shawSuccess("error");
    }
  };
  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        BoinApi.deleteBoins(id);
      }
      refetch();
      shawSuccess(t("boin deleted successfully"));
    } catch (err) {
      shawError(t("failed in delete boin"));
    }
  };

  const handleUpdate = (id?: number) => {
    if (id) {
      setSelectedId(id);
    }
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const filteredData = response.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const columns = [
    { th: t("ID"), key: "id" },
    { th: t("Name"), key: "name" },
    { th: t("Details"), key: "details" },
    { th: t("Price"), key: "price" },
    { th: t("Actions"), key: "actions" },
  ];
  const inputs = [
    {
      name: "name",
      label: t("Name"),
      error: errors.name,
      errorMassage: errors.name?.message,
    },
    {
      name: "details",
      label: t("Details"),
      error: errors.details,
      errorMassage: errors.details?.message,
    },
    {
      name: "price",
      label: t("Price"),
      error: errors.price,
      errorMassage: errors.price?.message,
    },
  ];
  const theme = useTheme();
  return (
    <Box
      sx={container}
      style={{
        backgroundColor:
          themeMode === "dark"
            ? theme.palette.primary.dark
            : theme.palette.background.default,
      }}
    >
      <Header
        themeMode={themeMode}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        label={t("Search For Boin")}
        title={t("My Boin")}
        toggleModal={toggleModal}
        titleButton={t("Add New Boin")}
      />
      <Body
        columns={columns}
        data={filteredData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        themeMode={themeMode}
      />
      <ButtonComponent
        themeMode={themeMode}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        handleFormSubmit={handleFormSubmit}
        control={control}
        formInput={formInput}
        inputs={inputs}
        errors={errors}
        selectedId={selectedId}
        isLoadingBoin={isLoadingBoin}
        reset={reset}
      />
    </Box>
  );
};

export default Boins;
