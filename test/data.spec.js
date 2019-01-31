require("../src/data");
const assert = require("chai").assert;


describe("verificar email", () => {
    it("deberia verificar si contiene solo un arroba", () => {
      assert.equal(verifyEmail("asf@dfda.com"), true);
      assert.equal(verifyEmail("adfa@@asdfa.com"), false);
      assert.equal(verifyEmail("asda.com"), false);
  });

  it("deberia tener el dominio despues del arroba", () => {
      assert.equal(verifyEmail(".com@asdfa"), false);
      assert.equal(verifyEmail("asfd@asf.com"), true);
  });

  it("deberia tener un dominio", () =>{
      assert.equal(verifyEmail("asfd@asdf"), false);
      assert.equal(verifyEmail("asdfa@adf."), false);
  });

  it("deberia haber al menos un caracter antes del arroba", () => {
      assert.equal(verifyEmail("@adf.com"), false);
      assert.equal(verifyEmail("a@adfa.com"), true);
  });
});