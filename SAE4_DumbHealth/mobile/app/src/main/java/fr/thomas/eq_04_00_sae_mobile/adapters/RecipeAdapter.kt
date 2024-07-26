package fr.thomas.eq_04_00_sae_mobile.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.TextView
import coil.load
import coil.transform.CircleCropTransformation
import fr.thomas.eq_04_00_sae_mobile.R
import fr.thomas.eq_04_00_sae_mobile.models.Recipe

class RecipeAdapter(
    context: Context,
    recipes: ArrayList<Recipe>
) : ArrayAdapter<Recipe>(context, R.layout.recipe_item, recipes) {
    @SuppressLint("ViewHolder", "InflateParams")
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val inflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val row = inflater.inflate(R.layout.recipe_item, null)

        val recipe = getItem(position)
        val tvTitle = row.findViewById<TextView>(R.id.tv_r_title)
        val iv = row.findViewById<ImageView>(R.id.iv_r)

        tvTitle.text = recipe?.title
        iv?.load(recipe?.image) {
            placeholder(R.drawable.placeholder)
            transformations(CircleCropTransformation())
        }

        return row
    }
}