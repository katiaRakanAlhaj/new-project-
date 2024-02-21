import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useArticles, { articleQueries } from "../../api/articles/query";
import { ArticleApi } from "../../api/articles/api";
import { shawError, shawSuccess } from "../../lib/tosts";
import { Box, useMediaQuery } from "@mui/material";
import { container, formInput } from "../../components/style/style";
import { useForm } from "react-hook-form";
import { categoryQueries } from "../../api/categories/query";
import { IArticle } from "../../api/articles/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_article } from "../../components/schema/shcema";
import { useTheme } from "@mui/material";
import Header from "../../components/Header/Header";
import Body from "../../components/body/body";
import ButtonComponent from "./addNewArticle";

const Article = ({ themeMode }: { themeMode: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(0);
  const { data: response = [], refetch } = useArticles();
  const { data: article, isLoading: isLoadingArticle } =
    articleQueries.useGetArticle(selectedId);
  const { data: categories = [] } = categoryQueries.useCategories();

  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        ArticleApi.deleteArticles(id);
      }
      refetch();
      shawSuccess(t("article deleted successfully"));
    } catch (err) {
      shawError(t("failed in delete article"));
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

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<IArticle>({
    resolver: yupResolver(schema_article),
    defaultValues: {
      title: "",
      description: "",
      category: [],
    },
  });
  const generateRandomNumber = (min: number, max: number): number => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(randomNumber);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    reset();
    setSelectedId(0);
  };
  useEffect(() => {
    if (selectedId > 0 && article) {
      const selecedCata = article.category.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setValue("title", article.title);
      setValue("description", article.description);
      setValue("category", selecedCata);
      setValue("id", article.id);
    }
  }, [selectedId, article]);

  const handleFormSubmit = async (data: IArticle) => {
    try {
      if (selectedId > 0) {
        await ArticleApi.updateArticles({ data: data, id: selectedId });
        shawSuccess(t("article updated successfully"));
      } else {
        await ArticleApi.postArticles({
          data: { ...data, id: generateRandomNumber(1, 100) },
        });
        shawSuccess(t("article added sucessfully"));
      }
      refetch();
      setSelectedId(0);
      toggleModal();
      reset();
    } catch (error) {
      shawSuccess("error");
    }
  };

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

  const columns = [
    { th: t("ID"), key: "id" },
    { th: t("Title"), key: "title" },
    { th: t("Description"), key: "description" },
    { th: t("Category"), key: "category" },
    { th: t("Actions"), key: "actions" },
  ];

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
        label={t("Search For Article")}
        title={t("My Article")}
        toggleModal={toggleModal}
        titleButton={t("Add New Article")}
      />

      <Body
        columns={columns}
        data={newData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        themeMode={themeMode}
      />
      {isModalOpen && (
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
          isLoadingArticle={isLoadingArticle}
          reset={reset}
          categories={categories}
        />
      )}
    </Box>
  );
};

export default Article;
