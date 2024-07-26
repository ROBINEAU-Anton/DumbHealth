package fr.thomas.eq_04_00_sae_mobile.models

import kotlinx.serialization.Serializable

@Serializable
data class Recipe (
    val id: Int,
    val title: String,
    val summary: String? = null,
    val image: String,
    val readyInMinutes: Int? = null,
    val sourceName: String? = null,
    val sourceUrl: String? = null,
    val healthScore: Double? = null,
    val pricePerService: Double? = null,
    val cheap: Boolean? = null,
    val diets: List<String>? = null,
    val dishTypes: List<String>? = null,
): java.io.Serializable {
    companion object {
        val TEST_RECIPE = Recipe(
            1,
            "Pâte Carbonara",
            "Ce sont des pâtes avec de la crême fraiche et des lardons. Repas italien revisité à la française, car en Italie, ils ne mettent pas de crème fraiche.",
            "https://img.spoonacular.com/recipes/716429-556x370.jpg",
            30,
            "Thomas AMBROISE",
            "https://thomas-ambroise.fr",
            15.0,
            10.0,
            true,
            listOf("omnivore"),
            listOf("main dish"),
        )
    }
}