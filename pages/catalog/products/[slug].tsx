import { useRouter } from "next/router";
import { useState } from "react";
import AddToCartModal from "../../../components/AddToCartModal";
import { Title } from "../../../styles/pages/Home";

export default function Product() {
  const router = useRouter();
  const [isModalVisible, SetIsModalVisible] = useState<boolean>(false);

  function handleAddToCart() {
      SetIsModalVisible(true);
  }

  return (
    <div>
      <Title>{router.query.slug}</Title>

      <button onClick={handleAddToCart}>Add to cart</button>

      { isModalVisible && <AddToCartModal /> }
    </div>
  );
}
