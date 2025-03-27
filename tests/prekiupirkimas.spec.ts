import { test, expect } from '@playwright/test';
//goto to website
test.beforeEach('Visiting page', async({page})=>{
    await page.goto('https://lightgrey-antelope-m7vwozwl8xf7l3y2.builder-preview.com/');
    await expect(page).toHaveTitle('Freshly Baked Muffins - Cozy Online Muffin Shop | Muffin');
});


test('Success Buying muffin', async({page})=>{
    //shopTabButton.click();
    await page.locator('a[data-qa="navigationblock-page-shop"]:visible').click();
    //productByName.click();
    await page.locator('h6[data-qa="product-list-section-item-title"]:has-text("Glazed Paradise Donuts")').click();

    //addToBagButton.click();
    await page.getByTestId('productsection-btn-addtobag').click();

    //checkoutButton.click();
    await page.getByTestId('shoppingcart-btn-checkout').click();

    //Select lithuania from country list  !!!!need time to rethink
    await page.locator('[data-qa="checkout-shippingdestination-select"]').click();
    await page.getByRole('option', { name: 'Lithuania' }).click();
    //Shipping
    await page.locator('[data-qa="checkout-shippingoptions-parcelselect"]').click();
    await page.getByRole('option', { name: 'Akmenės NORFA Daukanto paštomatas, S. Daukanto g. 7' }).click();

    await page.locator('[data-qa="checkout-shippingdetails-continue"]').click();
    
    //info
    await page.getByRole('textbox', { name: 'Email' }).fill('Testusr@gmail.com');
    await page.getByRole('textbox', { name: 'Your full name' }).fill('Testusr');
    await page.getByRole('textbox', { name: 'Your phone number' }).fill('+37062545874')
    await page.getByRole('textbox', { name: 'Your comment' }).fill('shipping was hard');
    await page.locator('[data-qa="checkout-contactinformation-continue"]').click();
    //confirm buying
    await page.getByTestId('checkout-paymentmethods-placeorder').click();
    //Check for popup
    await expect(page.getByText('Your order has been received.')).toHaveClass('payment-info__text body-large');
   //Close popup
    await page.getByRole('button', { name: 'Got it' }).click();
});