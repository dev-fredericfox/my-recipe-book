import { useState } from "react";
import { GetServerSideProps } from "next";
import { getAllCategories } from "../../lib/getAllCategories";
import type { NextPage } from "next";
import Head from "next/head";
import Title from "../../components/Title";
import GenericGreenButton from "../../components/GenericGreenButton";
import Layout from "../../components/Layout";
import CategoryDropdown from "../../components/CategoryDropdown";
import AddCategoryModal from "../../components/AddCategoryModal";
import { Category } from "../../lib/interfaces";
import { saveToDB } from "../../lib/fetchHelper";
import { CheckIcon } from "@heroicons/react/solid";

export const getServerSideProps: GetServerSideProps<any> = async ({ req }) => {
  try {
    const categories = await getAllCategories();
    return {
      props: { categories },
    };
  } catch (error) {
    return {
      props: "Error",
    };
  }
};

interface Props {
  categories: Category[];
}

const CreatePost: NextPage<Props> = ({ categories }) => {
  const [amountOfIngredients, setAmountOfIngredients] = useState(1);
  const [title, setTitle] = useState("");
  const [coverimg, setCoverimg] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [fetchError, setFetchError] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  const [categoryArray, setCategoryArray] = useState<Category[]>(categories);
  const [addNewCategory, setAddNewCategory] = useState(false);

  const appendNewlyAddedCategoryToCategoryArray = (e: Category) => {
    setCategory(e.name);
    const cache = [...categoryArray];
    cache.push(e);
    setCategoryArray(cache);
  };

  const submitData = async (published: boolean) => {
    const body = {
      title,
      content,
      coverimg,
      category,
      published,
      ingredients,
    };
    try {
      const result = await saveToDB("POST", 0, body);
      setFetchResult(result);
      setFetchStatus("OK");
    } catch (error: any) {
      setFetchResult("Failed");
      console.log("error.message");
      setFetchError(error.message);
    }
  };

  interface Ingredient {
    emoji: string;
    ingredient: string;
    amount: string;
    unit: string;
  }

  const removeIngredientAndPopArray = () => {
    setAmountOfIngredients(amountOfIngredients - 1);
    ingredients.pop();
  };
  const addIngredients = (
    ingredientValues: string,
    ingredientName: string,
    index: number
  ) => {
    const idx = index - 1;

    const cache: Ingredient[] = [...ingredients];
    const ingredient: Ingredient = {
      emoji: cache[idx]?.emoji ?? "",
      ingredient: cache[idx]?.ingredient ?? "",
      amount: cache[idx]?.amount ?? "",
      unit: cache[idx]?.unit ?? "",
    };
    ingredient[ingredientName as keyof Ingredient] = ingredientValues;
    cache[idx] = ingredient;
    setIngredients([...cache]);
  };

  const ingredientsJSX = (key: number) => (
    <div className="flex mt-2 flex-row" key={key}>
      <div className="mr-2 w-20">
        <input
          onChange={(e) => addIngredients(e.target.value, "emoji", key)}
          className="rounded-lg pl-5 w-full h-12 px-2"
          type="text"
          placeholder="Emoji"
        />
      </div>
      <div className="mr-2 grow">
        <input
          onChange={(e) => addIngredients(e.target.value, "ingredient", key)}
          className="rounded-lg pl-5 w-full h-12 px-2"
          type="text"
          placeholder="Ingredient"
        />
      </div>
      <div className="mr-2 w-24">
        <input
          onChange={(e) => addIngredients(e.target.value, "amount", key)}
          className="rounded-lg pl-5 w-full h-12 px-2"
          type="text"
          placeholder="Amount"
        />
      </div>
      <div className="w-20">
        <input
          onChange={(e) => addIngredients(e.target.value, "unit", key)}
          className="rounded-lg pl-5 w-full h-12 px-2"
          type="text"
          placeholder="Unit"
        />
      </div>
    </div>
  );

  const ingredientRow = (numberOfLines: number) => {
    const rows = [];
    for (let i = 1; i <= numberOfLines; i++) {
      rows.push(ingredientsJSX(i));
    }
    return rows;
  };
  return (
    <div>
      <Head>
        <title>Add Recipe</title>
        <meta name="description" content="Add Recipe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <div className="mt-6">
            <Title title="New Recipe" />
          </div>
          <div className="mt-6">
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg pl-5 w-full h-12 px-2"
              type="text"
              placeholder="Recipe Name"
            />
          </div>
          <div className="flex flex-row mt-2">
            <input
              onChange={(e) => setCoverimg(e.target.value)}
              className="rounded-lg pl-5 w-full h-12 px-2 mr-2"
              type="text"
              placeholder="Cover Image"
            />
            <CategoryDropdown
              categories={categoryArray}
              select={(e) => setCategory(e)}
              selected={category}
              addNewCategory={(): void => setAddNewCategory(!addNewCategory)}
            />
          </div>
          {addNewCategory && (
            <AddCategoryModal
              closeModal={() => setAddNewCategory(false)}
              addNewCategoryToDropdown={(e: Category) =>
                appendNewlyAddedCategoryToCategoryArray(e)
              }
            />
          )}
          {ingredientRow(amountOfIngredients)}
          <div className="flex flex-row">
            <GenericGreenButton
              text="Add Ingredient"
              click={() => setAmountOfIngredients(amountOfIngredients + 1)}
            />
            <GenericGreenButton
              text="Remove Ingredient"
              click={() => removeIngredientAndPopArray()}
            />
          </div>
          <div className="mt-6">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg pt-2 pl-5 w-full h-40 px-2"
              placeholder="Recipe Instructions"
            />
          </div>
        </div>
        <GenericGreenButton
          text="Save as Draft"
          click={() => submitData(false)}
        />
        <GenericGreenButton text="Publish" click={() => submitData(true)} />
        <p>{fetchStatus === "OK" && <CheckIcon className="h-6 w-6" />}</p>
        <p>{fetchError}</p>
      </Layout>
    </div>
  );
};

export default CreatePost;
