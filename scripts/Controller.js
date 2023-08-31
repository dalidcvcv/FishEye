  class Controller {
    async initIndex() {
      let model = new Model();
      const { photographers } = await model.getPhotographers();
      let listPhotographersView = new ListPhotographersView();
      listPhotographersView.displayData(photographers);
    }
  
    async initPhotographer() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const photographerId = urlSearchParams.get("id");
  
      let model = new Model();
      const { photographer, media } = await model.getPhotographerById(photographerId);
  
      let photographerView = new PhotographerView(photographer, media);
      photographerView.displayData(photographer, media);
    }
  }

  