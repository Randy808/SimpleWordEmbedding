let sentences = "The dog ran away. I spy a dog. I'm allergic to dog fur. My dog chased my cat.";

sentences = sentences.replace(/\./g , " \n");
let words = sentences.split(" ");
let bagOfWords = {};
let centerWordVectors = {};
let outsideWordVectors = {};


function createRandomizedWordVector(length){
	let vector = [];
	for(let i = 0 ; i < length ; i++){
		vector.push(Math.random());
	}
	return vector;
}

function dot(u,v){
	console.assert(u.length == v.length, `vector lengths must be equal: ${u} \n ${v} \n END OF ERROR \n\n`);

	let sum = 0;
	for (var i = 0; i < u.length; i++) {
		sum+=u[i]*v[i];
	}
	return sum;
}

function subtract(u,v){
	console.assert(u.length == v.length, `vector lengths must be equal: ${u} \n ${v} \n END OF ERROR \n\n`);

	for (var i = 0; i < u.length; i++) {
		u[i] = u[i] - v[i];
	}
	return u;
}

function add(u,v){
	console.assert(u.length == v.length, `vector lengths must be equal: ${u} \n ${v} \n END OF ERROR \n\n`);

	for (var i = 0; i < u.length; i++) {
		u[i] = u[i] + v[i];
	}
	return u;
}

function el_divide(u, l){
	for (var i = 0; i < u.length; i++) {
		u[i] = u[i]/l;
	}

	return u;
}

function normalize(u){
	let norm_sq = dot(u,u);
	return el_divide(u,Math.sqrt(norm_sq));
}

for(let i = 0 ; i < words.length ; i++){
	let word = words[i];
	if(!bagOfWords[words[i]]){
		bagOfWords[words[i]] = {
			count: 0,
			context_words: []
		};
		centerWordVectors[word] = normalize(createRandomizedWordVector(2));
		outsideWordVectors[word] = normalize(createRandomizedWordVector(2));
	}

	bagOfWords[words[i]].count+=1;
	if(i - 1 > 0 && words[i-1] != '\n')
		bagOfWords[words[i]].context_words.push(words[i - 1]);
	if(i + 1 < words.length && words[i+1] != '\n')
		bagOfWords[words[i]].context_words.push(words[i + 1]);	
}

function train(words, centerWordVectors, outsideWordVectors){
	for (word in bagOfWords) {
		let wordObj = bagOfWords[word];
		for (var j = 0; j < wordObj.context_words.length; j++) {
			let contextWord = wordObj.context_words[j];
			let centerWord = word;
			let randomWord = words[Math.floor(Math.random()*words.length)];


			let center_word_vector = centerWordVectors[centerWord];
			let context_word_vector = outsideWordVectors[contextWord];
			let random_word_vector = outsideWordVectors[randomWord];

			console.log(context_word_vector,center_word_vector);
			console.log("END\n\n");

			let contextSimilarity = dot(context_word_vector,center_word_vector);
			let randomSimilarity = dot(random_word_vector,center_word_vector);

			let cost = contextSimilarity - randomSimilarity;

			console.log("first_cost: " + cost);
			let gradient_center = add(context_word_vector,random_word_vector);
			let gradient_context = center_word_vector;
			let gradient_random = center_word_vector;

			center_word_vector = add( center_word_vector, gradient_center);
			context_word_vector= add(context_word_vector,gradient_context);
			random_word_vector = subtract(random_word_vector, gradient_random);

			contextSimilarity = dot(context_word_vector,center_word_vector);
			randomSimilarity = dot(random_word_vector,center_word_vector);

			cost = contextSimilarity - randomSimilarity;

			centerWordVectors[centerWord] = normalize(center_word_vector);
			outsideWordVectors[contextWord] = normalize(context_word_vector);
			outsideWordVectors[randomWord] = normalize(random_word_vector);

			console.log("updated_cost: " + cost);
			console.log("\n\n\n");

		}
	}
}


function findClosest(word, centerWordVectors){
	let c = centerWordVectors[word];
	let similarity;
	let max = Number.MIN_VALUE;
	let closestWord;

	for ( context in centerWordVectors) {
		similarity = dot(centerWordVectors[context], c);
		if(similarity > max){
			closestWord = context;
			console.log('context word is: ' + context)
		}
	}

	console.log("The closest word is: " + closestWord);
}

train(words, centerWordVectors, outsideWordVectors);
findClosest("sniffer", centerWordVectors)

