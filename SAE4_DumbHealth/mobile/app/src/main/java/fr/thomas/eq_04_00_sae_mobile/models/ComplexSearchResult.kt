package fr.thomas.eq_04_00_sae_mobile.models
import kotlinx.serialization.Serializable

@Serializable
data class ComplexSearchResult (
    val offset: Int,
    val number: Int,
    val results: ArrayList<Recipe>
): java.io.Serializable {
    companion object {
        val TEST_COMPLEX_SEARCH_RESULT = ComplexSearchResult(
            0,
            10,
            arrayListOf(Recipe.TEST_RECIPE)
        )
    }
}