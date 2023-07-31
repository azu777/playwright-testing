import { test, expect } from '@playwright/test';
import { ArtPage, CheckoutPage, LoginPage, RegisterPage, DeliveryDetailsPage, PaymentPage } from '../src/pages';
import { NavigationPagFragment } from '../src/pages/navigation.fragment';
import { v4 as uuid4 } from 'uuid';
import { deliveryDetails as userData, paymentData } from '../src/data';

test.only('Should checkout product', async function ({ page }) {
  const artPage = new ArtPage(page);
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const deliveryDetailsPage = new DeliveryDetailsPage(page);
  const paymentPage = new PaymentPage(page);
  const navigation = new NavigationPagFragment(page);

  const email = `${uuid4()}@test.com`;
  const password = uuid4();

  await artPage.visit();
  // await artPage.sortByCheapest();
  await artPage.click({ addButton: null });

  await page.pause();
  // await artPage.addProductToBasket(0);
  // await artPage.addProductToBasket(1);
  // await artPage.addProductToBasket(2);
  // await navigation.goToCheckout();

  // await checkoutPage.removeCheapestProduct();
  // await checkoutPage.continueToCheckout();

  // await loginPage.goToSignUp();
  // await registerPage.signUpAsNewUser(email, password);

  // await deliveryDetailsPage.fillDetails(userData);
  // await deliveryDetailsPage.saveDetails();
  // await deliveryDetailsPage.goToPayment();

  // await paymentPage.activateDiscount();
  // await paymentPage.setPaymentDetails(paymentData);
  // await paymentPage.completePayment();
});
