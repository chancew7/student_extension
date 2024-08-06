
export class markup{

    constructor (url,  markup_key = null, annotations = null, comments = null){
        this.url = url;
        this.markupKey = markup_key;
        this.annotations = annotations;
    }

    addAnnotation(annotation){
        this.annotations.add(annotation);
    }
    removeAnnotation(annotation){
        this.annotations.remove(annotation);
    }
    resetMarkup(){
        //for comment in comments comment.remove
        //for annotation in annotations annotation.remove
        comments.clear();
        annotations.clear();
    }

    toJSON() {
        return {
          url: this.url,
          markupKey: this.markupKey,
          annotations: Array.from(this.annotations).map(annotation => annotation.toJSON()),
          comments: Array.from(this.comments).map(comment => comment.toJSON())
        };
      }
    

}