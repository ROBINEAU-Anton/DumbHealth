package fr.thomas.eq_04_00_sae_mobile.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentTransaction
import fr.thomas.eq_04_00_sae_mobile.R
import fr.thomas.eq_04_00_sae_mobile.adapters.RecipeAdapter
import fr.thomas.eq_04_00_sae_mobile.dao.RecipeDAO
import fr.thomas.eq_04_00_sae_mobile.fragments.ResultViewFragment
import fr.thomas.eq_04_00_sae_mobile.fragments.ResultsListFragment

class ResultActivity : AppCompatActivity(), OnItemSelectedListener {

    private lateinit var mainActivityIntent: Intent

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.result_activity)

        mainActivityIntent = Intent(this, MainActivity::class.java)

        val recipes = RecipeDAO.findAll()
        if(recipes.isEmpty()) {
            startActivity(mainActivityIntent)
            return
        }

        supportFragmentManager.beginTransaction()
            .replace(R.id.fl_result_list_frameLayout, ResultsListFragment.newInstance(recipes))
            .addToBackStack(null)
            .commit()

        findViewById<Button>(R.id.btn_result_back)?.setOnClickListener { startActivity(mainActivityIntent) }
    }

    override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
        if(parent != null) {
            val recipe = (parent.adapter as RecipeAdapter).getItem(position) ?: return
            val info = RecipeDAO.findById(recipe.id.toString()) ?: return
            supportFragmentManager.beginTransaction()
                .replace(R.id.fl_result_view_frameLayout, ResultViewFragment.newInstance(info))
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE)
                .addToBackStack(null)
                .commit()
        }
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {}
}