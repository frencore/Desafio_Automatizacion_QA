const { By, Builder, Browser } = require("selenium-webdriver");
// const { assert } = require("assert");
const rutaEvidencia = "./src/evidencia/";
var fs = require("fs");
var data = fs.readFileSync("./src/data/usuariosQa.json", "utf8");
const user = JSON.parse(data);

describe("Prueba Previred puntaje extra", () => {
  it("Añadir al carrito dos PC HP LP3065", async function () {
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get(
      "http://opencart.abstracta.us/index.php?route=common/home"
    );
    driver.manage().window().maximize();

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/a/span[1]'))
      .click(); //btnMyAccount

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/ul/li[2]/a'))
      .click(); //btnlogin
    await driver
      .findElement(By.xpath('//*[@id="input-email"]'))
      .sendKeys("a008@chunfli.com"); //input-email

    await driver
      .findElement(By.xpath('//*[@id="input-password"]'))
      .sendKeys(user.password); //input-password

    await driver
      .findElement(By.xpath('//*[@id="content"]/div/div[2]/div/form/input'))
      .click(); //btnLogin
    await driver.sleep(2000);

    const inputTextSearch = await driver.findElement(By.name("search")); //inputTextSearch
    inputTextSearch.click();
    inputTextSearch.sendKeys("HP LP3065");
    await driver.findElement(By.className("btn btn-default btn-lg")).click(); //btnSearch

    inputTextSearch.click();
    inputTextSearch.sendKeys("\uE015"); //down button https://www.selenium.dev/selenium/docs/api/rb/Selenium/WebDriver/Keys.html
    await driver.sleep(1000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[2]/button[1]')
      )
      .click(); //btnAddItem

    await driver.sleep(3000);
    var inputQuantity = await driver.findElement(
      By.xpath('//*[@id="input-quantity"]')
    ); //input-quantity

    inputQuantity.clear();
    await driver.sleep(1000);
    inputQuantity.sendKeys("2");
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//*[@id="button-cart"]')).click(); //btnAddItem

    await driver.sleep(1000);

    await driver
      .findElement(By.xpath('//*[@id="content"]/div/div[1]/ul[2]/li[2]/a'))
      .click(); //linkSpecification

    const assert = require("assert");

    await driver
      .findElement(
        By.xpath('//*[@id="tab-specification"]/table/tbody[1]/tr/td[2]')
      )
      .getText()
      .then((val) => {
        assert.equal(val, "16GB");
      }); //valida 16GB del producto

    await driver
      .findElement(By.xpath('//*[@id="content"]/div/div[1]/ul[2]/li[3]/a'))
      .click(); //linkReviews

    await driver.sleep(1000);
    //Escribir un review ingresando un texto de largo menor a 25 carateres y obtener mensaje de warning
    var textAreaReview = await driver.findElement(
      By.xpath('//*[@id="input-review"]')
    );
    textAreaReview.click();
    var texto = "";

    for (let index = 0; index < 25; index++) {
      texto = texto + "a";
    }
    textAreaReview.sendKeys(texto);

    await driver.findElement(By.xpath('//*[@id="button-review"]')).click(); //buttonContinue
    await driver.sleep(4000);

    await driver
      .findElement(By.xpath('//*[@id="form-review"]/div[2]'))
      .getText()
      .then((val) => {
        assert.equal(val, "Warning: Please select a review rating!");
      }); //valida  Warning: Please select a review rating!

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}obtenerMensajeWarning.png`,
        image,
        "base64"
      );
    });

    // Escribir un review válido = Your Name,  Your review y Rating neutral (radio button central) y obtener mensaje de ingreso correcto
    await driver
      .findElement(By.xpath('//*[@id="form-review"]/div[5]/div/input[3]'))
      .click(); //radioRatingCentral

    await driver.findElement(By.xpath('//*[@id="button-review"]')).click(); //buttonContinue

    await driver.sleep(4000);

    await driver
      .findElement(By.xpath('//*[@id="form-review"]/div[2]'))
      .getText()
      .then((val) => {
        assert.equal(
          val,
          "Thank you for your review. It has been submitted to the webmaster for approval."
        );
      }); //valida   Thank you for your review. It has been submitted to the webmaster for approval.

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}reviewValido.png`,
        image,
        "base64"
      );
    });
    await driver.quit();
  });

  it("Comparar los productos: Apple Cinema 30 y Samsung SyncMaster 941BW", async function () {
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get(
      "http://opencart.abstracta.us/index.php?route=common/home"
    );
    driver.manage().window().maximize();

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/a/span[1]'))
      .click(); //btnMyAccount

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/ul/li[2]/a'))
      .click(); //btnlogin
    await driver
      .findElement(By.xpath('//*[@id="input-email"]'))
      .sendKeys("a008@chunfli.com"); //input-email

    await driver
      .findElement(By.xpath('//*[@id="input-password"]'))
      .sendKeys(user.password); //input-password

    await driver
      .findElement(By.xpath('//*[@id="content"]/div/div[2]/div/form/input'))
      .click(); //btnLogin
    await driver.sleep(2000);

    inputTextSearch = await driver.findElement(By.name("search")); //inputTextSearch
    inputTextSearch.click();
    inputTextSearch.sendKeys("Apple Cinema 30");
    await driver.findElement(By.className("btn btn-default btn-lg")).click(); //btnSearch

    inputTextSearch.click();
    inputTextSearch.sendKeys("\uE015"); //down button https://www.selenium.dev/selenium/docs/api/rb/Selenium/WebDriver/Keys.html
    await driver.sleep(1000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[2]/button[1]')
      )
      .click(); //btnAddItem
    await driver.sleep(4000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[1]/div[2]/div[1]/button[2]')
      )
      .click(); //btnCompare this Product
    await driver.sleep(4000);

    inputTextSearch = await driver.findElement(By.name("search")); //inputTextSearch
    inputTextSearch.click();
    inputTextSearch.sendKeys("Samsung SyncMaster 941BW");
    await driver.findElement(By.className("btn btn-default btn-lg")).click(); //btnSearch
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[1]/h4/a')
      )
      .click(); //link Samsung SyncMaster 941BW
    await driver.sleep(2000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[1]/div[2]/div[1]/button[2]')
      )
      .click(); //btnCompare this Product
    await driver.sleep(4000);
    await driver
      .findElement(By.xpath('//*[@id="product-product"]/div[1]/a[2]'))
      .click(); //link compare this product
    await driver.sleep(4000);
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}cuadroComparativoAmbosProductos.png`,
        image,
        "base64"
      );
    });
    await driver.quit();
  });
});
