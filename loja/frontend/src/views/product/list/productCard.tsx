"use client";
import { Card } from "flowbite-react";
import{useState} from"react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "../../product.module.css";  

interface ProductCardProps {
  name: string;
  //description: string;

}

function ProductCard({ name }: ProductCardProps) {
  const [qtdCard, setQtdCard] = useState<number>(0);
  const decreaseCard = () => setQtdCard((p)=> Math.max(p - 1, 0));
  const increaseCard = () => setQtdCard((p)=> Math.min(p + 1, 99));
  return (
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
      <p className="flex gap-2">
        <button className={styles.buttonIcon} onClick={decreaseCard} disabled={qtdCard === 0}>
          <FaMinus/>
        </button>
        {qtdCard}
        <button className={styles.buttonIcon} onClick={increaseCard}><FaPlus/></button>
      </p>
    </Card>
  );
}
export default ProductCard;
