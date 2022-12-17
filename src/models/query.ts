export interface IQuery {
    keyword: string,
    products: IProduct[]
}

interface IProduct {
    title: string,
    url: string,
    price: number,
    image: string,
    input: {
        keyword: string
    }
    error?: string
}