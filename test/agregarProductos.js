const { By, Builder, Browser } = require("selenium-webdriver");
const { assert } = require("assert");

describe("Prueba Previred parte uno", () => {
  before(
    "'Ejecutando precondiciones principales de TODAS a las pruebas'",
    () => {}
  );
  beforeEach("'Ejecutando precondiciones POR CADA PRUEBA", () => {});

  it("Validar que los articulos en el carro sean Ipod Classic y iMac", async function () {
    const rutaEvidencia = "./src/evidencia/";
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get(
      "http://opencart.abstracta.us/index.php?route=common/home"
    );
    driver.manage().window().maximize();
    const inputTextSearch = await driver.findElement(By.name("search")); //inputTextSearch
    inputTextSearch.click();
    inputTextSearch.sendKeys("Ipod Classic");
    await driver.findElement(By.className("btn btn-default btn-lg")).click(); //btnSearch

    inputTextSearch.click();
    inputTextSearch.sendKeys("\uE015"); //down button https://www.selenium.dev/selenium/docs/api/rb/Selenium/WebDriver/Keys.html
    await driver.sleep(1000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[2]/button[1]')
      )
      .click(); //btnAddItem

    await driver.sleep(1000);

    const inputTextSearch2 = await driver.findElement(By.name("search"));
    inputTextSearch2.clear();
    inputTextSearch2.sendKeys("iMac");
    await driver.findElement(By.className("btn btn-default btn-lg")).click();
    inputTextSearch2.sendKeys("\uE015");
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[2]/button[1]')
      )
      .click(); //btnAddItem
    await driver.sleep(2000);
    await driver
      .findElement(
        By.className("btn btn-inverse btn-block btn-lg dropdown-toggle")
      )
      .click(); //btnCart

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}carritoDeCompra.png`,
        image,
        "base64"
      );
    });

    await driver
      .findElement(By.xpath('//*[@id="cart"]/ul/li[2]/div/p/a[1]/strong/i'))
      .click(); //btnViewCart

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}resumenCarritoCompra.png`,
        image,
        "base64"
      );
    });

    const assert = require("assert");

    await driver
      .findElement(
        By.xpath('//*[@id="content"]/form/div/table/tbody/tr[1]/td[2]/a')
      )
      .getAttribute("text")
      .then((val) => {
        assert.equal(val, "iMac");
      }); //valida nombre producto iMac en View Cart

    await driver
      .findElement(
        By.xpath('//*[@id="content"]/form/div/table/tbody/tr[2]/td[2]/a')
      )
      .getAttribute("text")
      .then((val) => {
        assert.equal(val, "iPod Classic");
      }); //valida nombre producto iPod Classic en View Cart

    inputTextSearch.sendKeys("\uE015");

    await driver
      .findElement(By.xpath('//*[@id="content"]/div[3]/div[2]/a'))
      .click(); //btnCheckout

    await driver.sleep(1000);

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}checkout.png`,
        image,
        "base64"
      );
    });

    await driver.quit();
  });
});
