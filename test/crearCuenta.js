const { By, Builder, Browser } = require("selenium-webdriver");
const { assert } = require("assert");
//  import { us } from "../src/Data/usuariosQa-copy.json";
const rutaEvidencia = "./src/evidencia/";
var fs = require("fs");
var data = fs.readFileSync("./src/data/usuariosQa.json", "utf8");
const user = JSON.parse(data);

describe("Prueba Previred parte dos", () => {
  before(
    "'Ejecutando precondiciones principales de TODAS a las pruebas'",
    () => {}
  );
  beforeEach("'Ejecutando precondiciones POR CADA PRUEBA", () => {});

  it("Crear Cuenta y agregar direccion", async function () {
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get(
      "http://opencart.abstracta.us/index.php?route=common/home"
    );
    driver.manage().window().maximize();

    await driver.findElement(By.xpath('//*[@id="top-links"]/ul/li[2]')).click(); //btnMyAccount

    await driver.sleep(2000);

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/ul/li[1]/a'))
      .click(); //btnRegister

    await driver
      .findElement(By.xpath('//*[@id="input-firstname"]'))
      .sendKeys(user.firstname); //inputTextfirstname
    await driver
      .findElement(By.xpath('//*[@id="input-lastname"]'))
      .sendKeys(user.lastname); //inputTextlastname
    await driver
      .findElement(By.xpath('//*[@id="input-email"]'))
      .sendKeys(user.email); //inputTextemail
    await driver
      .findElement(By.xpath('//*[@id="input-telephone"]'))
      .sendKeys(user.telephone); //inputTexttelephone
    await driver
      .findElement(By.xpath('//*[@id="input-password"]'))
      .sendKeys(user.password); //inputTextpassword
    await driver
      .findElement(By.xpath('//*[@id="input-confirm"]'))
      .sendKeys(user.password); //inputTextconfirm
    await driver
      .findElement(By.xpath('//*[@id="content"]/form/div/div/input[1]'))
      .click(); //checkbox Privacy Policy
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}registerForm.png`,
        image,
        "base64"
      );
    });
    await driver
      .findElement(By.xpath('//*[@id="content"]/form/div/div/input[2]'))
      .click(); //btnContinue

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}registerAccountOK.png`,
        image,
        "base64"
      );
    });
    await driver.findElement(By.xpath('//*[@id="content"]/div/div/a')).click(); //btnContinue
    await driver.sleep(1000);

    //Add direccion
    await driver
      .findElement(By.xpath('//*[@id="content"]/ul[1]/li[3]/a'))
      .click(); //link Address Book
    await driver.sleep(1000);

    await driver
      .findElement(By.xpath('//*[@id="content"]/div/div[2]/a'))
      .click(); //btn New Address
    await driver.sleep(1000);

    await driver
      .findElement(By.xpath('//*[@id="input-firstname"]'))
      .sendKeys(user.firstname); //input-firstname

    await driver
      .findElement(By.xpath('//*[@id="input-lastname"]'))
      .sendKeys(user.lastname); //input-lastname

    await driver
      .findElement(By.xpath('//*[@id="input-address-1"]'))
      .sendKeys(user.address); //input-address-1

    await driver
      .findElement(By.xpath('//*[@id="input-city"]'))
      .sendKeys(user.city); //input-city

    await driver
      .findElement(By.xpath('//*[@id="input-postcode"]'))
      .sendKeys(user.postcode); //input-postcode

    await driver.findElement(By.xpath('//*[@id="input-country"]')).click(); //input-country
    await driver
      .findElement(By.xpath('//*[@id="input-country"]'))
      .sendKeys(user.country); //input-country
    await driver.findElement(By.xpath('//*[@id="input-country"]')).click(); //input-country

    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="input-zone"]')).click(); //input-zone
    await driver
      .findElement(By.xpath('//*[@id="input-zone"]'))
      .sendKeys(user.zone); //input-zone
    await driver.findElement(By.xpath('//*[@id="input-zone"]')).click(); //input-zone

    await driver
      .findElement(
        By.xpath('//*[@id="content"]/form/fieldset/div[10]/div/label[1]/input')
      )
      .click(); //btnYes

    await driver
      .findElement(By.xpath('//*[@id="content"]/form/div/div[2]/input'))
      .click(); //btnContinue
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}adressAccountOK.png`,
        image,
        "base64"
      );
    });

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/a/span[1]'))
      .click(); //btnMyAccount
    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/ul/li[5]/a'))
      .click(); //btnLogout
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}logout.png`,
        image,
        "base64"
      );
    });
    await driver.quit();
  });

  it("Login Exitoso", async function () {
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
      .sendKeys(user.email); //input-email

    await driver
      .findElement(By.xpath('//*[@id="input-password"]'))
      .sendKeys(user.password); //input-password

    await driver
      .findElement(By.xpath('//*[@id="content"]/div/div[2]/div/form/input'))
      .click(); //btnLogin
    await driver.sleep(2000);
    const assert = require("assert");

    await driver
      .findElement(By.xpath('//*[@id="column-right"]/div/a[2]'))
      .getAttribute("text")
      .then((val) => {
        assert.equal(val, "Edit Account");
      }); //valida login text My Account
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}loginOK.png`,
        image,
        "base64"
      );
    });
    await driver.quit();
  });
});
