import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/pages/publish.css";
import errorHandler from "../utils/errorHandler";

const PublishPage = () => {
  const token = Cookies.get("token");

  const [picture, setPicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const formData = new FormData();
  formData.append("picture", picture);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("price", price);

  const VITE_API_fqdn = import.meta.env.VITE_API_fqdn;
  const VITE_API_protocol = import.meta.env.VITE_API_protocol;

  const handleChange = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    };
  };

  return token ? (
    <main className="publish">
      <div className="container publish__container">
        <h1 className="publish__title">Vends ton article</h1>
        <form
          className="publish__form"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const response = await axios({
                method: "post",
                url: `${VITE_API_protocol}://${VITE_API_fqdn}/offer/publish`,
                data: formData,
                headers: {
                  authorization: `Bearer ${token}`,
                },
              });

              if (response.status == 201) {
                alert("Annonce publiee");
              }
            } catch (error) {
              errorHandler(error);
            }
          }}
        >
          <section className="publish__card publish__card--photo">
            <div className="publish__file-row">
              <label className="publish__file-label " htmlFor="picture">
                Ajoute une photo
              </label>

              <input
                className="publish__file-input"
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreviewPicture(objectUrl);
                }}
              />

              {previewPicture && (
                <img className="publish__preview-image" src={previewPicture} />
              )}
            </div>
          </section>

          <section className="publish__card">
            <div className="publish__row">
              <label className="publish__label" htmlFor="title">
                Titre
              </label>
              <input
                className="publish__input"
                type="text"
                name="title"
                id="title"
                placeholder="ex: Chemise verte"
                value={title}
                onChange={handleChange(setTitle)}
              />
            </div>

            <div className="publish__row">
              <label className="publish__label" htmlFor="description">
                Décris ton article
              </label>
              <textarea
                className="publish__textarea"
                name="description"
                id="description"
                placeholder="ex: porte quelquefois, taille correctement"
                value={description}
                onChange={handleChange(setDescription)}
              ></textarea>
            </div>
          </section>

          <section className="publish__card">
            <div className="publish__row">
              <label className="publish__label" htmlFor="brand">
                Marque
              </label>
              <input
                className="publish__input"
                type="text"
                name="brand"
                id="brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={handleChange(setBrand)}
              />
            </div>

            <div className="publish__row">
              <label className="publish__label" htmlFor="size">
                Taille
              </label>
              <input
                className="publish__input"
                type="text"
                name="size"
                id="size"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={handleChange(setSize)}
              />
            </div>

            <div className="publish__row">
              <label className="publish__label" htmlFor="color">
                Couleur
              </label>
              <input
                className="publish__input"
                type="text"
                name="color"
                id="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={handleChange(setColor)}
              />
            </div>

            <div className="publish__row">
              <label className="publish__label" htmlFor="condition">
                Etat
              </label>
              <input
                className="publish__input"
                type="text"
                name="condition"
                id="condition"
                placeholder="ex: Neuf"
                value={condition}
                onChange={handleChange(setCondition)}
              />
            </div>

            <div className="publish__row">
              <label className="publish__label" htmlFor="city">
                Ville
              </label>
              <input
                className="publish__input"
                type="text"
                name="city"
                id="city"
                placeholder="ex: Paris"
                value={city}
                onChange={handleChange(setCity)}
              />
            </div>
          </section>

          <section className="publish__card">
            <div className="publish__row">
              <label className="publish__label" htmlFor="price">
                Prix en euros
              </label>
              <input
                className="publish__input"
                type="text"
                name="price"
                id="price"
                placeholder="ex: 10.00"
                value={price}
                onChange={handleChange(setPrice)}
              />
            </div>
          </section>
          <button className="publish__submit">Ajouter</button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default PublishPage;
