// 1.6.1 create seed data
const beauties = [
    {
        photo: "https://www.cetaphil.com/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-us-m-catalog/default/dw73122065/Moisturizing%20Cream%2016oz/CETAPHIL_Moisturizing_Cream_16oz.png?sw=900&sh=900&sm=fit&q=85",
        brandName: "Cetaphil",
        name: "Cream",
        category: "Cream",
        qty: 1,
        size: "16oz",
        rating: 4.5,
        description: "For Dry to Normal, Sensitive Skin moisturing cream for body and face"
    },
    {
        photo: "https://www.cetaphil.com/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-us-m-catalog/default/dw968ed157/Rich%20Hydrating%20Night%20Cream%20Face%20Moisturizer%201.7%20Oz/302993889021_1.png?sw=900&sh=900&sm=fit&q=85",
        brandName: "Cetaphil",
        name: "Rich Hydrating Cream",
        category: "Cream",
        qty: 1,
        size: "1.7oz",
        rating: 4.5,
        description: "For Dry to Normal, Sensitive Skin"
    },
    {
        photo: "https://biossance.com/cdn/shop/products/6379_23_0215_PDP_LacticAcidNewName_Solider_1160x1160_d062c7e6-e47d-41ab-8105-f43038d64066_600x.jpg?v=1680205397",
        brandName: "Biossance",
        name: "Squalane Lactic Acid Resurfacing",
        category: "Serum",
        qty: 1,
        size: "10oz",
        rating: 4.8,
        description: "Gently exfoliates skin"
    },
    {
        photo: "https://biossance.com/cdn/shop/products/RoseOil_600x.jpg?v=1683547005",
        brandName: "Biossance",
        name: "Squalane Vitamin C Rose Oil",
        category: "Oil",
        qty: 1,
        size: "10oz",
        rating: 4.5,
        description: "Calms, soothes, and locks in moisture"
    },
    {
        photo: "https://biossance.com/cdn/shop/products/22_0201_WB_PDP_P4645_LipBalm_Allure2021Seal_5aa8baf4-b383-4d8f-9f8e-37421bc8a0f5_600x.jpg?v=1679417430",
        brandName: "Biossance",
        name: "Squalane Rose Vegan Lip Balm",
        category: "Balm",
        qty: 1,
        size: "0.52oz",
        rating: 4.5,
        description: "Delivers extra moisture for soft healthy lips"
    },
    {
        photo: "https://shiseido.ipscdn.net/sa2/dw/image/v2/BBSK_PRD/on/demandware.static/-/Sites-itemmaster_shiseido/default/dwcb8d59de/images/2022/July/Top25/0730852155794_2.jpg?sw=800&sh=800&sm=fit",
        brandName: "Shiseido",
        name: "Wrinkle Smoothing Eye Cream",
        category: "Cream",
        qty: 1,
        size: "15ml",
        rating: 4.5,
        description: "Anti-aging eye cream"
    },
    {
        photo: "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1589585-847&recipeName=680",
        brandName: "Sekkisei",
        name: "Kose Lotion Toner",
        category: "Toner",
        qty: 1,
        size: "12.1ml",
        rating: 4.5,
        description: "Hydrates and Moisturizes"
    }        
]

// 1.6.1 Export the seed data to `models/index.js`
module.exports = beauties