/**
 * Asset Image Map
 * Resolves database image_url strings to local static assets.
 */

export const ASSET_MAP = {
  // Product images
  'prod_apple_shimla.png': require('../../assets/prod_apple_shimla.png'),
  'prod_banana_robusta.png': require('../../assets/prod_banana_robusta.png'),
  'prod_tomato_local.png': require('../../assets/prod_tomato_local.png'),
  'prod_potato_fresh.png': require('../../assets/prod_potato_fresh.png'),
  'prod_onion_red.png': require('../../assets/prod_onion_red.png'),
  'prod_carrot_fresh.png': require('../../assets/prod_carrot_fresh.png'),
  'prod_capsicum_mix.png': require('../../assets/prod_capsicum_mix.png'),
  'prod_broccoli_fresh.png': require('../../assets/prod_broccoli_fresh.png'),

  // Vegetables images
  'veg_tomato.png': require('../../assets/veg_tomato.png'),
  'veg_onion.png': require('../../assets/veg_onion.png'),
  'veg_potato.png': require('../../assets/veg_potato.png'),
  'veg_carrot.png': require('../../assets/veg_carrot.png'),
  'veg_capsicum.png': require('../../assets/veg_capsicum.png'),
  'veg_broccoli.png': require('../../assets/veg_broccoli.png'),
  'veg_cauliflower.png': require('../../assets/veg_cauliflower.png'),
  'veg_cucumber.png': require('../../assets/veg_cucumber.png'),
  'veg_brinjal.png': require('../../assets/veg_brinjal.png'),
  'veg_ladyfinger.png': require('../../assets/veg_ladyfinger.png'),
  'veg_greenbeans.png': require('../../assets/veg_greenbeans.png'),
  'veg_spinach.png': require('../../assets/veg_spinach.png'),

  // Category grid images
  'cat_grid_fruits.jpg': require('../../assets/cat_grid_fruits.jpg'),
  'cat_grid_dairy.jpg': require('../../assets/cat_grid_dairy.jpg'),
  'cat_grid_snacks.jpg': require('../../assets/cat_grid_snacks.jpg'),
  'cat_grid_staples.jpg': require('../../assets/cat_grid_staples.jpg'),
  'cat_grid_household.jpg': require('../../assets/cat_grid_household.jpg'),
  'cat_grid_personal.jpg': require('../../assets/cat_grid_personal.jpg'),
  'cat_grid_baby.jpg': require('../../assets/cat_grid_baby.jpg'),
  'cat_grid_pet.jpg': require('../../assets/cat_grid_pet.jpg'),

  // Featured categories
  'cat_feat_organic.jpg': require('../../assets/cat_feat_organic.jpg'),
  'cat_feat_snacks.png': require('../../assets/cat_feat_snacks.png'),
  'cat_feat_snacks.jpg': require('../../assets/cat_feat_snacks.jpg'),
  'cat_feat_beverages.jpg': require('../../assets/cat_feat_beverages.jpg'),
  'cat_feat_beverages.png': require('../../assets/cat_feat_beverages.jpg'),

  // Cart & Cross sell
  'item_banana.png': require('../../assets/item_banana.png'),
  'cross_milk.png': require('../../assets/cross_milk.png'),
  'cross_bread.png': require('../../assets/cross_bread.png'),
  'cross_eggs.png': require('../../assets/cross_eggs.png'),
  'cross_oil.png': require('../../assets/cross_oil.png'),

  // Gallery
  'tomato_gallery_1.png': require('../../assets/tomato_gallery_1.png'),
  'tomato_gallery_2.png': require('../../assets/tomato_gallery_2.png'),
  'tomato_gallery_3.png': require('../../assets/tomato_gallery_3.png'),
  'tomato_gallery_4.png': require('../../assets/tomato_gallery_4.png'),
  'tomato_gallery_5.png': require('../../assets/tomato_gallery_5.png'),

  // Users
  'user_aryan.png': require('../../assets/user_aryan.png'),
};

export function getProductAsset(imageName, fallback = require('../../assets/veg_tomato.png')) {
  if (!imageName) return fallback;
  if (typeof imageName === 'object') return imageName;
  if (typeof imageName === 'number') return imageName; // require ID
  if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
    return { uri: imageName };
  }
  const cleanName = imageName.replace(/^.*[\\/]/, '');
  return ASSET_MAP[cleanName] || fallback;
}
