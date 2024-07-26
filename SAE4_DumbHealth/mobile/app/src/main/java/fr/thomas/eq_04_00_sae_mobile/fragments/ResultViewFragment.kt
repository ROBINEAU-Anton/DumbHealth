package fr.thomas.eq_04_00_sae_mobile.fragments

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import coil.load
import coil.transform.CircleCropTransformation
import fr.thomas.eq_04_00_sae_mobile.R
import fr.thomas.eq_04_00_sae_mobile.models.Recipe

// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_RECIPE = "recipe"

/**
 * A simple [Fragment] subclass.
 * Use the [ResultViewFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ResultViewFragment : Fragment() {
    private var recipe: Recipe? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            recipe = it.getSerializable(ARG_RECIPE, Recipe::class.java)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val viewContent = inflater.inflate(R.layout.result_view_fragment, container, false)
        viewContent.findViewById<TextView>(R.id.result_view_title)?.text = recipe?.title?:"Inconnue"
        viewContent.findViewById<TextView>(R.id.result_view_description)?.text = recipe?.summary?:"Aucune description"
        viewContent.findViewById<TextView>(R.id.result_view_prep_time)?.text = recipe?.readyInMinutes?.toString().apply { plus(" minutes") }?:"Inconnue"
        viewContent.findViewById<TextView>(R.id.result_view_diets_list)?.text = recipe?.diets?.joinToString(", ")?:"Aucun régime précisé"
        viewContent.findViewById<TextView>(R.id.result_view_score)?.text = (recipe?.healthScore ?: "Inconnue").toString()
        val iv = viewContent.findViewById<ImageView>(R.id.result_view_iv)
        if(recipe?.image != null ) iv?.load(recipe?.image) {
            placeholder(R.drawable.placeholder)
            transformations(CircleCropTransformation())
        }
        else iv?.setImageResource(R.drawable.placeholder)
        viewContent.findViewById<ImageButton>(R.id.result_view_link_to_recipe)?.setOnClickListener {
            val url = recipe?.sourceUrl?: return@setOnClickListener
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        }

        return viewContent
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param recipe The recipe
         * @return A new instance of fragment TestFragment2.
         */
        @JvmStatic
        fun newInstance(recipe: Recipe) =
            ResultViewFragment().apply {
                arguments = Bundle().apply {
                    putSerializable(ARG_RECIPE, recipe)
                }
            }
    }
}