import config from './config.json';

var unwanted = [
  'food',
  'packaged goods',
  'produce',
  'fruit',
  'table',
  'vegetable',
  'can',
  'plate',
  'cup',
  'drink',
  'plant',
  'vegetarian food',
  'cuisine',
  'beverage',
  'non-alcoholic beverage',
  'liquid',
  'beverage can',
  'aluminium can',
  'tin can',
  'meat',
  'bird',
  'dish',
];

export const localizeObjects = async fileName => {
  // [START vision_localize_objects]
  // Imports the Google Cloud client libraries
  //const vision = require('@google-cloud/vision');
  const RNFS = require('react-native-fs');

  let items = [];

  // Creates a client
  //const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */

  try {
    const googleVisionRes = await fetch(
      config.googleCloud.api + config.googleCloud.apiKey,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: await RNFS.readFile(
                  fileName.replace('file://', ''),
                  'base64',
                ),
              },
              features: [{type: 'LABEL_DETECTION', maxResults: 4}],
            },
          ],
        }),
      },
    );
    const object = (await googleVisionRes.json()).responses;
    const item = JSON.stringify(object);
    const parsedItem = JSON.parse(item)[0].labelAnnotations.map(
      ({description}) => {
        (items = [...items, description])}
    );
    return items;
  } catch (e) {
    console.log(e);
  }
};

export const getRecipies = async items => {
  if (items === []) return;
  try {
    let item_s = '';
    items.map(item => (item_s += item + ','));
    let URL =
      'https://api.spoonacular.com/recipes/findByIngredients?apiKey=edb963e93ce0484997f379cf3fe4c428&ingredients=' +
      item_s +
      '&number=1&ranking=2';
    let r = await fetch(URL);
    let data = await r.json();
    URL =
      'https://api.spoonacular.com/recipes/' +
      data[0].id +
      '/information?apiKey=edb963e93ce0484997f379cf3fe4c428&includeNutrition=false';
    r = await fetch(URL);
    let info = await r.json();
    return info;
  } catch (e) {
    console.log(e);
  }
};

let x = {
  vegetarian: true,
  vegan: true,
  glutenFree: true,
  dairyFree: true,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  weightWatcherSmartPoints: 1,
  gaps: 'GAPS_FULL',
  lowFodmap: true,
  preparationMinutes: 2, // this
  cookingMinutes: 0, // this
  aggregateLikes: 0,
  spoonacularScore: 10,
  healthScore: 1,
  creditsText: 'Food.com',
  sourceName: 'Food.com',
  pricePerServing: 95.67, // this
  extendedIngredients: [
    {
      id: 9132,
      aisle: 'Produce',
      image: 'red-grapes.jpg',
      consistency: 'solid',
      name: 'grape',
      original: '1 ounce grape soda, or',
      originalString: '1 ounce grape soda, or',
      originalName: 'grape soda, or',
      amount: 1,
      unit: 'ounce',
      meta: [],
      metaInformation: [],
      measures: {
        us: {amount: 1, unitShort: 'oz', unitLong: 'ounce'},
        metric: {amount: 28.35, unitShort: 'g', unitLong: 'grams'},
      },
    },
    {
      id: 9200,
      aisle: 'Produce',
      image: 'orange.png',
      consistency: 'solid',
      name: 'orange',
      original: '1 ounce orange soda',
      originalString: '1 ounce orange soda',
      originalName: 'orange soda',
      amount: 1,
      unit: 'ounce',
      meta: [],
      metaInformation: [],
      measures: {
        us: {amount: 1, unitShort: 'oz', unitLong: 'ounce'},
        metric: {amount: 28.35, unitShort: 'g', unitLong: 'grams'},
      },
    },
    {
      id: 14051,
      aisle: 'Alcoholic Beverages',
      image: 'vodka.jpg',
      consistency: 'liquid',
      name: 'vodka',
      original: '1 ounce vodka',
      originalString: '1 ounce vodka',
      originalName: 'vodka',
      amount: 1,
      unit: 'ounce',
      meta: [],
      metaInformation: [],
      measures: {
        us: {amount: 1, unitShort: 'oz', unitLong: 'ounce'},
        metric: {amount: 28.35, unitShort: 'g', unitLong: 'grams'},
      },
    },
  ],
  id: 122919,
  title: 'Sweet Tart Shots',
  readyInMinutes: 2,
  servings: 1,
  sourceUrl: 'http://www.food.com/recipe/sweet-tart-shots-313796',
  image: 'https://spoonacular.com/recipeImages/122919-556x370.jpg',
  imageType: 'jpg',
  summary:
    'Sweet Tart Shots is a <b>caveman, gluten free, primal, and fodmap friendly</b> beverage. One serving contains <b>98 calories</b>, <b>0g of protein</b>, and <b>0g of fat</b>. This recipe serves 1 and costs 96 cents per serving. 1 person were impressed by this recipe. From preparation to the plate, this recipe takes around <b>2 minutes</b>. If you have grape soda, orange soda, vodka, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 13%</b>. This score is rather bad. Try <a href="https://spoonacular.com/recipes/sweet-potato-tart-tatindam-good-sweet-by-david-guas-raquel-pe-45216">Sweet Potato Tart Tatindam Good Sweet By David Guas & Raquel Pe</a>, <a href="https://spoonacular.com/recipes/sweet-potato-tart-551678">Sweet potato tart</a>, and <a href="https://spoonacular.com/recipes/sweet-farro-tart-761356">Sweet Farro Tart</a> for similar recipes.',
  cuisines: [],
  dishTypes: [],
  diets: [
    'gluten free',
    'dairy free',
    'lacto ovo vegetarian',
    'fodmap friendly',
    'vegan',
  ],
  occasions: [],
  winePairing: {},
  instructions: null,
  analyzedInstructions: [],
  originalId: null,
};

/* [
  {
    id: 122919,
    title: 'Sweet Tart Shots',
    image: 'https://spoonacular.com/recipeImages/122919-312x231.jpg',
    imageType: 'jpg',
    usedIngredientCount: 1,
    missedIngredientCount: 2,
    missedIngredients: [
      {
        id: 9132,
        amount: 1,
        unit: 'ounce',
        unitLong: 'ounce',
        unitShort: 'oz',
        aisle: 'Produce',
        name: 'grape',
        original: '1 ounce grape soda, or',
        originalString: '1 ounce grape soda, or',
        originalName: 'grape soda, or',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/red-grapes.jpg',
      },
      {
        id: 14051,
        amount: 1,
        unit: 'ounce',
        unitLong: 'ounce',
        unitShort: 'oz',
        aisle: 'Alcoholic Beverages',
        name: 'vodka',
        original: '1 ounce vodka',
        originalString: '1 ounce vodka',
        originalName: 'vodka',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/vodka.jpg',
      },
    ],
    usedIngredients: [
      {
        id: 9200,
        amount: 1,
        unit: 'ounce',
        unitLong: 'ounce',
        unitShort: 'oz',
        aisle: 'Produce',
        name: 'orange',
        original: '1 ounce orange soda',
        originalString: '1 ounce orange soda',
        originalName: 'orange soda',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/orange.png',
      },
    ],
    unusedIngredients: [],
    likes: 0,
  },
];
 */
