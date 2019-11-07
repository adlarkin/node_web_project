/* global Vue */
/* global fetch */

var app = new Vue({
    el: '#app',
    
    data: {
        pokemon_name: '',
        pokemon_info: '',
        total_num_pokemon: 807,
    },
    
    created() {
        // this.getNumPokemon();
    },
    
    methods: {
        handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        },
        // getNumPokemon() {
        //     fetch('/pokeCount')
        //         .then((data) => {
        //             return data.json();
        //         })
        //         .then((basicInfo) => {
        //             this.total_num_pokemon = basicInfo["count"];
        //             console.log("total num_pokemon is " + this.total_num_pokemon);
        //         });
        // },
        getPokeInfo() {
            if (this.pokemon_name === '') {
                return;
            }
            
            this.pokemon_info = '';
            
            fetch('/getPokemonInfo?p=' + this.pokemon_name)
                .then(this.handleErrors)
                .then((data) => {
                    return data.json();
                })
                .then((pokeInfo) => {
                    console.log(pokeInfo);
                    this.pokemon_info  = pokeInfo;
                })
                .catch(error => {
                    console.log(error);
                    this.pokemon_info = {error:"Invalid Search :("};
                });
        },
        getRandomPoke() {
            let min = 1
            let max = this.total_num_pokemon;
            let rand_poke = Math.floor(Math.random() * (max - min + 1)) + min;
            this.pokemon_name = rand_poke;
            this.getPokeInfo();
        },
        getStatPercentage(val, max) {
            return "width: " + (Math.round((val/max) * 100)).toString() + "%";
        }
    },
});
