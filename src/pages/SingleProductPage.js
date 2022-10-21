import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    fetchSingleProduct,
    singleProduct,
    singleProductLoading,
    singleProductError,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  const {
    stars,
    stock,
    images,
    name,
    colors,
    description,
    reviews,
    price,
    company,
  } = singleProduct;

  useEffect(() => {
    if (singleProductError) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [singleProductError]);

  if (singleProductLoading) {
    return <Loading />;
  }

  if (singleProductError) {
    return <Error />;
  }
  return (
    <Wrapper>
      <PageHero title={name} product={singleProduct} />
      <div className="section section-center">
        <Link to="/products" className="btn">
          back to product
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <div className="content">
            <h2>{name}</h2>
            <Stars stars={stars} review={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {id}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
