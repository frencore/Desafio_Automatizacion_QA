const { By, Builder, Browser } = require("selenium-webdriver");
// const { assert } = require("assert");
const rutaEvidencia = "./src/evidencia/";
var fs = require("fs");
var data = fs.readFileSync("./src/data/usuariosQa.json", "utf8");
const user = JSON.parse(data);

describe("Prueba Previred", () => {
  before("Crear usuario", async function () {
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
  beforeEach(
    "validar login del nuevo usuario y credenciales correctas",
    async function () {
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
    }
  );

  it("Checkout", async function () {
    let driver = new Builder().forBrowser("chrome").build();
    // await driver.manage().setTimeouts({ implicit: 2000 });
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
    await driver.sleep(1000);

    const inputTextSearch = await driver.findElement(By.name("search")); //inputTextSearch
    inputTextSearch.click();
    inputTextSearch.sendKeys("Ipod Classic");
    await driver.findElement(By.className("btn btn-default btn-lg")).click(); //btnSearch
    await driver.sleep(2000);
    // await driver.wait(until.elementIsVisible(inputTextSearch), 2000);
    inputTextSearch.click();
    inputTextSearch.sendKeys("\uE015"); //down button https://www.selenium.dev/selenium/docs/api/rb/Selenium/WebDriver/Keys.html

    await driver.sleep(1000);
    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[2]/button[1]')
      )
      .click(); //btnAddItem

    await driver.sleep(2000);

    const inputTextSearch2 = await driver.findElement(By.name("search"));
    inputTextSearch2.clear();
    inputTextSearch2.sendKeys("iMac");
    await driver.findElement(By.className("btn btn-default btn-lg")).click();
    inputTextSearch2.sendKeys("\uE015");
    await driver.sleep(1000);
    // await driver.wait(until.elementIsVisible(By.xpath('//*[@id="content"]/div[3]/div/div/div[2]/div[2]/button[1]')), 2000);
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
        `${rutaEvidencia}carritoDeCompraCheckout.png`,
        image,
        "base64"
      );
    });
    await driver
      .findElement(By.xpath('//*[@id="cart"]/ul/li[2]/div/p/a[1]/strong/i'))
      .click(); //btnViewCart

    await driver.sleep(1000);
    await driver.findElement(By.xpath('//*[@id="search"]/input')).click();
    await driver
      .findElement(By.xpath('//*[@id="search"]/input'))
      .sendKeys("\uE015");
    await driver.sleep(1000);
    await driver
      .findElement(By.xpath('//*[@id="accordion"]/div[2]/div[1]/h4/a'))
      .click(); //btnEstimate Shipping & Taxes

    await driver.findElement(By.xpath('//*[@id="button-quote"]')).click(); //btnGet Quotes

    await driver.sleep(2000);
    const assert = require("assert");
    //accede a modal
    driver.switchTo().activeElement();

    await driver
      .findElement(
        By.xpath('//*[@id="modal-shipping"]/div/div/div[2]/div/label/input')
      )
      .click(); //radioShipping_method

    await driver
      .findElement(
        By.xpath('//*[@id="modal-shipping"]/div/div/div[2]/div/label')
      )
      .getText()
      .then((val) => {
        assert.equal(val, "Flat Shipping Rate - $5.00");
      }); //valida Flat Shipping Rate - $5.00

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}FlatShippingRate500.png`,
        image,
        "base64"
      );
    });

    await driver.findElement(By.xpath('//*[@id="button-shipping"]')).click(); //btnModalApply Shipping

    //exit del modal
    driver.switchTo().activeElement();
    //cambia a la pantalla activa

    await driver.sleep(5000);

    await driver.findElement(By.xpath('//*[@id="search"]/input')).click();
    await driver
      .findElement(By.xpath('//*[@id="search"]/input'))
      .sendKeys("\uE015");

    await driver
      .findElement(
        By.xpath('//*[@id="content"]/div[2]/div/table/tbody/tr[2]/td[2]')
      )
      .getText()
      .then((val) => {
        assert.equal(val, "$5.00");
      }); //valida  Flat Shipping Rate: $5.00

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}totalCompra.png`,
        image,
        "base64"
      );
    });
    await driver
      .findElement(By.xpath('//*[@id="content"]/div[3]/div[2]/a'))
      .click(); //btnCheckout

    await driver.sleep(3000);
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}checkout.png`,
        image,
        "base64"
      );
    });

    await driver
      .findElement(By.xpath('//*[@id="button-payment-address"]'))
      .click(); //button-payment-address
    await driver.sleep(3000);

    await driver
      .findElement(By.xpath('//*[@id="button-shipping-address"]'))
      .click(); //button-shipping-address

    //agregar validacion direcion nombre titular compra

    await driver
      .findElement(By.xpath('//*[@id="shipping-existing"]/select'))
      .getText()
      .then((val) => {
        var dataUser = `${user.firstname}${user.lastname},${user.address},${user.city},${user.zone},${user.country}\n`;
        assert.equal(val.replace(/ /g, ""), dataUser.replace(/ /g, ""));
      }); //valida texto sin ESPACIOS: pepe chungale, av falsa 123, Santiago, Region Metropolitana, Chile

    await driver.sleep(4000);

    //valida en paso 4 Flat Shipping Rate
    await driver
      .findElement(
        By.xpath('//*[@id="collapse-shipping-method"]/div/div[1]/label')
      )
      .getText()
      .then((val) => {
        assert.equal(val, "Flat Shipping Rate - $5.00");
      }); //valida Flat Shipping Rate - $5.00

    await driver.sleep(1000);
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}flatShippingRate.png`,
        image,
        "base64"
      );
    });
    await driver.sleep(1000);

    await driver
      .findElement(By.xpath('//*[@id="button-shipping-method"]'))
      .click(); //button-shipping-method

    await driver.sleep(5000);

    await driver.findElement(By.xpath('//*[@id="search"]/input')).click();
    await driver
      .findElement(By.xpath('//*[@id="search"]/input'))
      .sendKeys("\uE015");

    //step 5
    await driver
      .findElement(
        By.xpath('//*[@id="collapse-payment-method"]/div/div[3]/div/input[1]')
      )
      .click(); //checkbox terms & conditions

    await driver
      .findElement(By.xpath('//*[@id="button-payment-method"]'))
      .click(); //button-payment-method

    //step 6
    await driver.sleep(2000);

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}confirmOrder.png`,
        image,
        "base64"
      );
    });

    await driver.findElement(By.xpath('//*[@id="button-confirm"]')).click(); //button-confirm

    //Your order has been successfully processed!
    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}successfullyProcessed.png`,
        image,
        "base64"
      );
    });
    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="content"]/div/div/a')).click(); //btnContinue

    await driver.sleep(1000);

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/a/span[1]'))
      .click(); //btnMyAccount

    await driver
      .findElement(By.xpath('//*[@id="top-links"]/ul/li[2]/ul/li[2]/a'))
      .click(); //linkOrderHistory
    await driver.sleep(5000);
    await driver
      .findElement(By.xpath('//*[@id="content"]/div[1]/table/tbody/tr/td[6]'))
      .getText()
      .then((val) => {
        //fecha de entrega el mismo dia, debe ser por uso horario en chile es (GMT-4)
        //ejemplo de como se puede validar fecha actual
        const now = new Date(); // https://codepen.io/logoys/pen/PRoZxJ
        const dia = now.getDate();
        const mes = now.getMonth() + 1;
        const year = now.getFullYear();
        //En este caso, el método toString() convierte el número en una cadena de texto,
        // y luego el método padStart() añade un cero a la izquierda de la cadena hasta que tenga una longitud de dos dígitos.
        const dia2 = dia.toString().padStart(2, "0"); //https://midu.dev/como-anadir-un-cero-a-la-izquierda-de-un-numero-en-javascript/
        const mes2 = mes.toString().padStart(2, "0");
        const fecha = dia2 + "/" + mes2 + "/" + year;
        assert.equal(val, fecha);
      }); //valida fecha de entrega

    await driver
      .findElement(By.xpath('//*[@id="content"]/div[1]/table/tbody/tr/td[4]'))
      .getText()
      .then((val) => {
        assert.equal(val, "Canceled");
      }); //valida el estado de la orden
    //pese a que se completa el flujo muestra cancelado
    // ver evidencia

    driver.takeScreenshot().then((image) => {
      require("fs").writeFileSync(
        `${rutaEvidencia}orderHistory.png`,
        image,
        "base64"
      );
    });
    await driver.quit();
  });
});
