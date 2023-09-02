class MediaFactory {
  static createMediaElement(item, photographerName) {
    let mediaType;
    let mediaSrc;

    //Détermination du type et de la source du média en fonction de ses propriétés
    if (item.image) {
      mediaType = "image";
      mediaSrc = `Sample Photos/${photographerName.split(" ")[0]}/${
        item.image
      }`;
    } else if (item.video) {
      mediaType = "video";
      mediaSrc = `Sample Photos/${photographerName.split(" ")[0]}/${
        item.video
      }`;
    }
    let mediaHtml;
    // Génération de code HTML correspond au média
    if (mediaType === "image") {
      mediaHtml = `<img src="${mediaSrc}" alt="${item.title}">`;
    } else if (mediaType === "video") {
      mediaHtml = `<video src="${mediaSrc}" alt="${item.title}" type="video/mp4"></video>`;
    }
    return mediaHtml;
  }
}
