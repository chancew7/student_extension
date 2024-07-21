
export class markup{

    constructor (url,  markup_key = null, annotations, comments){
        this.url = url;
        this.markupKey = markup_key;
        this.annotations = annotations;
        this.comments = comments;
    }

    addAnnotation(annotation){
        this.annotations.add(annotation);
    }
    addComment(comment){
        this.comments.add(comment);
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