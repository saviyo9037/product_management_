import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ProductF({ initialValues = {}, onSubmit, isEdit = false }) {
  const validationSchema = Yup.object({
    title: Yup.string().required("enter the title"),
    price: Yup.number().required("Enter the price"),
    category: Yup.string().required("enter the category"),
    description: Yup.string(),
    stock: Yup.number().min(0, "stock minimum 1").required("enter the stock"),
  });

  const defaultValues = {
    title: "",

    price: "",
    category: "",
    description: "",
    stock: "",
  };

  const values = { ...defaultValues, ...initialValues };

  return (
    <div className="p-4">
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className=" ">
            <div className="">
              {" "}
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className={`
                border px-5  py-2 w-full bg-gray-100 ${errors.title && touched.title ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="title"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-2">
              {" "}
              <Field
                type="number"
                name="price"
                placeholder="Price"
                className={`border bg-gray-100 px-5 py-2 w-full ${errors.price && touched.price ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="price"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-2">
              <Field
                type="text"
                name="category"
                placeholder="Category"
                className={`border px-5 py-2 w-full bg-gray-100 ${errors.category && touched.category ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="category"
                className="text-red-500  text-sm mt-1"
              />
            </div>
            <div className="mt-2">
              <Field
                name="description"
                placeholder="Enter the description"
                className={`border px-5 py-3 w-full bg-gray-100 ${errors.description && touched.description ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="description"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mt-2">
              <Field
                type="number"
                name="stock"
                placeholder="Stock"
                className={`border bg-gray-100 px-5 py-2 w-full ${errors.stock && touched.stock ? "border-red-500" : ""}`}
              />
              <ErrorMessage
                name="stock"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border rounded-xl mb-3 mt-4 text-2xl bg-gray-600 text-white px-5 py-2 hover:bg-red-400"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductF;
