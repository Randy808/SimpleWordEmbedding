# SimpleWordEmbedding
I did a project on Word2Vec a couple years ago but had some trouble understanding some of the implementation details. Now that I went back and reviewed it, I wanted to see if I could make a simple model with some semblance of the concepts used in Word2Vec. It did not work. Regardless of that fact, I decided to share my failure of an implementation with the world lol.

*Note*
Since the time Word2Vec came out and now, it's been shown that what the algorithm is really doing is a fancy form of matrix factorization where the matrix is derived from larger representations of word vectors. Due to this fact, it may be easier to understand and implement the algorithm using a bottom-up approach as shown here: https://multithreaded.stitchfix.com/blog/2017/10/18/stop-using-word2vec/

Also, here's a link to the paper showing that Word2Vec is fancy factorization: https://levyomer.files.wordpress.com/2014/09/neural-word-embeddings-as-implicit-matrix-factorization.pdf
