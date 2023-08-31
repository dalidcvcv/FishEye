class Model {
  async getPhotographers() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
  }
  // retourne le photographe par id et ses médias
  async getPhotographerById(idPhotographer) {
    const data = await this.getPhotographers();
    const photographer = data.photographers.find(
      (photographer) => photographer.id == idPhotographer
    );
    const media = data.media.filter(
      (media) => media.photographerId == idPhotographer
    );
    return {
      photographer,
      media,
    };
  }
}
