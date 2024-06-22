import { redirect } from "react-router-dom";
import Products from "../components/Products/Products";
import { getToken } from "../utils/tokenFunctions";

export function ProductsPage() {
    return <Products />
}

export default async function productsLoader({ request, params }) {
    // console.log('products Loader entered');
    const returnResult = {};
    const searchParams = new URL(request.url).searchParams;
    const searchPage = searchParams.get('page');
    const filterOption = searchParams.get('filter');
    const filters = searchParams.get('filterOptions');

    let category = params.category;
    let url = `https://techtrack-be.vercel.app/api/v1/`
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    if (category === 'Mobiles' || category === 'Laptops' || category === 'Accessories') {
        url += `products?category=${category}&page=${searchPage}`
    } else if (category === 'amazon' || category === 'BTECH' || category === '2b' || category === 'Kimo Store' || category === 'Raya' || category === 'union' || category === 'Noon' || category === 'dream2000') {
        url += `products?site=${category}&page=${searchPage}`;
    } else {
        const token = getToken();
        if (token) {
            url += `searchlogged?q=${category}&page=${searchPage}`;
            requestOptions.headers = {
                'Authorization': `Bearer ${JSON.parse(token)}`,
            };
        }
        else {
            url += `search?q=${category}&page=${searchPage}`;
        }
    }
    if (filterOption === 'on') {
        url += filters;
    }
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (category === 'Mobiles' || category === 'Laptops' || category === 'Accessories') {
        returnResult.result = result.data.data;
        returnResult.numberOfProducts = result.total;
    } else if (category === 'amazon' || category === 'BTECH' || category === '2b' || category === 'Kimo Store' || category === 'Raya' || category === 'union' || category === 'Noon' || category === 'dream2000') {
        returnResult.result = result.data.data;
        returnResult.numberOfProducts = result.total;
    } else {
        returnResult.result = result.data.searchResults;
        returnResult.numberOfProducts = result.total;
    }
    return returnResult;
}

export async function filterAction({ request, params }) {
    const searchParams = new URL(request.url).searchParams;
    const searchPage = searchParams.get('page');
    let category = params.category;
    let apiURL = '';

    const data = await request.formData();
    const filtersData = Object.fromEntries(data.entries());
    const categoryCheckbox1 = data.getAll('categoryCheckbox');

    categoryCheckbox1.includes('Mobiles')
    filtersData.minPrice !== '' && (apiURL += `%26price[gte]=${filtersData.minPrice}`);
    filtersData.maxPrice !== '' && (apiURL += `%26price[lte]=${filtersData.maxPrice}`);

    if (category === 'Mobiles' || categoryCheckbox1.includes('Mobiles')) {
        const siteCheckbox = data.getAll('siteCheckbox');
        const networkCheckbox = data.getAll('networkCheckbox');
        const simCountCheckbox = data.getAll('simCountCheckbox');
        const internalMemoryCheckbox = data.getAll('internalMemoryCheckbox');
        const ramCheckbox = data.getAll('ramCheckbox');
        const displaySizeCheckbox = data.getAll('displaySizeCheckbox');
        const operatingSystemCheckbox = data.getAll('operatingSystemCheckbox');

        filtersData.minBattery !== '' && filtersData.minBattery !== undefined && (apiURL += `%26battery[gte]=${filtersData.minBattery}`);
        filtersData.maxBattery !== '' && filtersData.minBattery !== undefined && (apiURL += `%26battery[lte]=${filtersData.maxBattery}`);
        filtersData.minPrimaryCamera !== '' && filtersData.minBattery !== undefined && (apiURL += `%26prim_cam[gte]=${filtersData.minPrimaryCamera}`);
        filtersData.maxPrimaryCamera !== '' && filtersData.minBattery !== undefined && (apiURL += `%26prim_cam[lte]=${filtersData.maxPrimaryCamera}`);
        filtersData.minSecondaryCamera !== '' && filtersData.minBattery !== undefined && (apiURL += `%26second_cam[gte]=${filtersData.minSecondaryCamera}`);
        filtersData.maxSecondaryCamera !== '' && filtersData.minBattery !== undefined && (apiURL += `%26second_cam[lte]=${filtersData.maxSecondaryCamera}`);
        siteCheckbox.length !== 0 && siteCheckbox.forEach(element => {
            apiURL += `%26site=${element}`
        });
        networkCheckbox.length !== 0 && networkCheckbox.forEach(element => {
            apiURL += `%26network=${element}`
        });
        simCountCheckbox.length !== 0 && simCountCheckbox.forEach(element => {
            apiURL += `%26SIM_count=${element}`
        });
        internalMemoryCheckbox.length !== 0 && internalMemoryCheckbox.forEach(element => {
            apiURL += `%26internal_memory=${element}`
        });
        ramCheckbox.length !== 0 && ramCheckbox.forEach(element => {
            apiURL += `%26ram=${element}`
        });
        displaySizeCheckbox.length !== 0 && displaySizeCheckbox.forEach(element => {
            apiURL += `%26display_size=${element}`
        });
        operatingSystemCheckbox.length !== 0 && operatingSystemCheckbox.forEach(element => {
            apiURL += `%26operating_system=${element}`
        });
        if (categoryCheckbox1.includes('Mobiles')) {
            categoryCheckbox1.length !== 0 && categoryCheckbox1.forEach(element => {
                apiURL += `%26category=${element}`
            });
        }
    } else if (category === 'Laptops' || categoryCheckbox1.includes('Laptops')) {
        const siteCheckbox = data.getAll('siteCheckbox');
        const displaySizeLaptopCheckbox = data.getAll('displaySizeLaptopCheckbox');
        const operatingSystemLaptopCheckbox = data.getAll('operatingSystemLaptopCheckbox');
        const ramLaptopCheckbox = data.getAll('ramLaptopCheckbox');
        const processorCheckbox = data.getAll('processorCheckbox');
        const graphicsCardCheckbox = data.getAll('graphicsCardCheckbox');
        const HDDCheckbox = data.getAll('HDDCheckbox');
        const SSDCheckbox = data.getAll('SSDCheckbox');

        siteCheckbox.length !== 0 && siteCheckbox.forEach(element => {
            apiURL += `%26site=${element}`
        });
        ramLaptopCheckbox.length !== 0 && ramLaptopCheckbox.forEach(element => {
            apiURL += `%26ram=${element}`
        });
        displaySizeLaptopCheckbox.length !== 0 && displaySizeLaptopCheckbox.forEach(element => {
            apiURL += `%26display_size=${element}`
        });
        operatingSystemLaptopCheckbox.length !== 0 && operatingSystemLaptopCheckbox.forEach(element => {
            apiURL += `%26operating_system=${element}`
        });
        processorCheckbox.length !== 0 && processorCheckbox.forEach(element => {
            apiURL += `%26processor=${element}`
        });
        graphicsCardCheckbox.length !== 0 && graphicsCardCheckbox.forEach(element => {
            apiURL += `%26graphics_card=${element}`
        });
        HDDCheckbox.length !== 0 && HDDCheckbox.forEach(element => {
            apiURL += `%26HDD=${element}`
        });
        SSDCheckbox.length !== 0 && SSDCheckbox.forEach(element => {
            apiURL += `%26SSD=${element}`
        });
        if (categoryCheckbox1.includes('Laptops')) {
            categoryCheckbox1.length !== 0 && categoryCheckbox1.forEach(element => {
                apiURL += `%26category=${element}`
            });
        }
    } else if (category === 'Accessories' || categoryCheckbox1.includes('Accessories')) {
        const siteCheckbox = data.getAll('siteCheckbox');
        const typeCheckbox = data.getAll('typeCheckbox');
        typeCheckbox.length !== 0 && typeCheckbox.forEach(element => {
            apiURL += `%26Accessories_type=${element}`
        });
        siteCheckbox.length !== 0 && siteCheckbox.forEach(element => {
            apiURL += `%26site=${element}`
        });
        if (categoryCheckbox1.includes('Accessories')) {
            categoryCheckbox1.length !== 0 && categoryCheckbox1.forEach(element => {
                apiURL += `%26category=${element}`
            });
        }
    } else if (category === 'amazon' || category === 'BTECH' || category === '2b' || category === 'Kimo Store' || category === 'Raya' || category === 'union' || category === 'Noon' || category === 'dream2000') {
        const categoryCheckbox = data.getAll('categoryCheckbox');
        categoryCheckbox.length !== 0 && categoryCheckbox.forEach(element => {
            apiURL += `%26category=${element}`
        });
    } else {
        const categoryCheckbox = data.getAll('categoryCheckbox');
        const siteCheckbox = data.getAll('siteCheckbox');
        categoryCheckbox.length !== 0 && categoryCheckbox.forEach(element => {
            apiURL += `%26category=${element}`
        });
        siteCheckbox.length !== 0 && siteCheckbox.forEach(element => {
            apiURL += `%26site=${element}`
        });
    }

    return redirect(`/categories/${category}?page=${searchPage}&filter=on&filterOptions=${apiURL}`)
}