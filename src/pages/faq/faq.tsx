import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { container, formInput } from "../../components/style/style";
import { useEffect, useState } from "react";
import useFAQS, { faqQueries } from "../../api/FAQ/query";
import { FaqApi } from "../../api/FAQ/api";
import { shawError, shawSuccess } from "../../lib/tosts";
import { IFAQ } from "../../api/FAQ/interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_faq } from "../../components/schema/shcema";
import { categoryQueries } from "../../api/categories/query";
import { useTheme } from "@mui/material";
import Header from "../../components/Header/Header";
import Body from "../../components/body/body";
import ButtonComponent from "./addNewFaq";

const FAQ = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useFAQS();

  const { data: faq, isLoading: isLoadingFaq } =
    faqQueries.useGetFAQ(selectedId);

  const { data: categories = [] } = categoryQueries.useCategories();

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      schema_faq({
        title: t("faq added sucessfully"),
        cat: t("faq added sucessfully"),
        description: t("faq added sucessfully"),
      })
    ),
    defaultValues: { title: "", description: "", category: [] },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };
  useEffect(() => {
    if (selectedId > 0 && faq) {
      setValue("title", faq.title);
      setValue("description", faq.description);
      setValue("category", faq.category);
    }
  }, [selectedId, faq]);

  const handleFormSubmit = async (data: IFAQ) => {
    try {
      if (selectedId > 0) {
        await FaqApi.updateFAQ({ data: data, id: selectedId });
        shawSuccess(t("faq updated successfully"));
      } else {
        await FaqApi.postFAQ({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t("faq added sucessfully"));
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
        FaqApi.deleteFAQ(id);
      }
      refetch();
      shawSuccess(t("faq deleted successfully"));
    } catch (err) {
      shawError(t("failed in delete faq"));
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

  const newData = response
    .filter((value) => value.title.includes(searchValue))
    .map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category.map((category) => (
          <div key={category.id}>{category.name}</div>
        )),
      };
    });

  const columns = [
    { th: t("ID"), key: "id" },
    { th: t("Title"), key: "title" },
    { th: t("Description"), key: "description" },
    { th: t("Category"), key: "category" },
    { th: t("Actions"), key: "actions" },
  ];
  const inputs = [
    {
      name: "title",
      label: t("Title"),
      error: errors.title,
      errorMassage: errors.title?.message,
    },
    {
      name: "description",
      label: t("Description"),
      error: errors.description,
      errorMassage: errors.description?.message,
    },
    {
      name: "category",
      label: t("Category"),
      error: errors.category,
      errorMassage: errors.category?.message,
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
        label={t("Search For Faq")}
        title={t("My Faq")}
        toggleModal={toggleModal}
        titleButton={t("Add New Faq")}
      />
      <Body
        columns={columns}
        data={newData}
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
        isLoadingFaq={isLoadingFaq}
        reset={reset}
        categories={categories}
      />
    </Box>
  );
};

export default FAQ;
