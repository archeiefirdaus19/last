const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.restaurants');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants-not-found');

  I.amOnPage('/');
  I.wait(5);
  I.seeElement('.list-item');

  const firstRestaurant = locate('h1').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.seeElement('h1 a');
  I.click(locate('h1 a').first());
  I.wait(5);

  // liking
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.wait(5);
  const likedRestaurantTitle = await I.grabTextFrom(locate('h1').first());
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  //liking
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants-not-found');

  I.amOnPage('/');
  I.wait(5);
  I.seeElement('.list-item');

  const firstRestaurant = locate('h1').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.seeElement('h1 a');
  I.click(locate('h1 a').first());
  I.wait(5);

  // liking
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.wait(5);
  const likedRestaurantTitle = await I.grabTextFrom(locate('h1').first());
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Unliking
  I.amOnPage('/#/favorite');
  I.wait(5);
  I.seeElement('h1 a');
  I.click(locate('h1 a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurants-not-found');
});