import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router';
import { Title } from "../../../styles/pages/Home";

interface IProduct {
    id: string;
    title: string;
  }

interface CategoriesProps {
    products: IProduct[]
}

export default function Categories({ products }: CategoriesProps) {

    const router = useRouter();

    if(router.isFallback) {
        return <p>carregando ...</p>
    }

    return (
        <div>
          <section>
            <Title>{router.query.slug}</Title>
    
            <ul>
              {products.map(product => (
                <li key={product.id} >
                  {product.title}
                </li>
              ))}
            </ul>
          </section>
        </div>
      );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`);
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;

    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 60,
    }
}