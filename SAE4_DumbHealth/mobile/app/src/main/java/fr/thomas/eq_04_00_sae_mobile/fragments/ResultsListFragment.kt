package fr.thomas.eq_04_00_sae_mobile.fragments

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ListView
import fr.thomas.eq_04_00_sae_mobile.R
import fr.thomas.eq_04_00_sae_mobile.adapters.RecipeAdapter
import fr.thomas.eq_04_00_sae_mobile.models.Recipe
import java.io.Serializable
import java.lang.RuntimeException

// the fragment initialization parameters
private const val ARG_RECIPES = "recipes"

/**
 * A simple [Fragment] subclass.
 * Use the [ResultsListFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ResultsListFragment : Fragment() {
    private var recipes: ArrayList<Recipe>? = null
    private lateinit var listener: OnItemSelectedListener

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            recipes = it.getSerializable(ARG_RECIPES, ArrayList::class.java) as ArrayList<Recipe>
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val viewContent = inflater.inflate(R.layout.results_list_fragment, container, false)
        val listView = viewContent.findViewById<ListView>(R.id.lv_res_list)
        if(recipes == null) return viewContent
        listView.adapter = RecipeAdapter(viewContent.context, recipes!!)
        listView.onItemClickListener = AdapterView.OnItemClickListener { p0, p1, p2, p3 -> listener.onItemSelected(p0, p1, p2, p3) }
        return viewContent
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        if(context is OnItemSelectedListener) {
            listener = context
        } else {
            throw RuntimeException("$context must implement OnItemSelectedListener")
        }
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param recipes List of recipes.
         * @return A new instance of fragment TestFragment1.
         */
        @JvmStatic
        fun newInstance(recipes: ArrayList<Recipe>) =
            ResultsListFragment().apply {
                arguments = Bundle().apply {
                    putSerializable(ARG_RECIPES, recipes as Serializable)
                }
            }
    }
}